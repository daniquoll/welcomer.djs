const Discord = require('discord.js')
const config = require('./config.json')
const bot = new Discord.Client({fetchAllMembers: true})

bot.on("guildMemberAdd", async member => {
    let where = formatAndWhere(config, 1, member, member.guild),
        message = replacer(config.greeting.message, member, member.guild.name)

    try {
        await where.send(message)
        await console.log(`[Member Join]: Member ${member.user.tag} join to server ${member.guild.name}`)
    } catch (err) {
        if (err == 'DiscordAPIError: DiscordAPIError: Cannot send messages to this user') console.log(`[DM Closed]: Member ${member.user.tag} has closed DM`)
        else if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${where.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.on("guildMemberRemove", async member => {
    let where = formatAndWhere(config, 2, member, member.guild),
        message = replacer(config.farewell.message, member, member.guild.name)

    try {
        await where.send(message)
        await console.log(`[Member Left]: Member ${member.user.tag} left from server ${member.guild.name}`)
    } catch (err) {
        if (err == 'DiscordAPIError: Cannot send messages to this user') console.log(`[DM Closed]: Member ${member.user.tag} has closed DM`)
        else if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${where.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.login(config.token)

bot.on("ready", async () => {
    let presence = config.presence
    await bot.user.setPresence({
        status: presence.status,
        game: {
            name: presence.game_name,
            type: presence.type,
            url: presence.game_url ? presence.game_url : null
        }
    })
    .then(console.log(`[Presence]: Status successfully set`))
    .catch(console.error)

    await console.log(`[Start]: ${bot.user.username} connected to Discord`)
})

function formatAndWhere(settings, event, member, guild) {
    let format, where

    if (event == 1)
        format = settings.greeting
    else if (event == 2)
        format = settings.farewell
    else
        throw new Error(`Unknown event target: ${event}`)

    if (format.to_dm)
        where = member
    else
        where = guild.channels.get(format.channel_id)

    if (!where) throw new Error(`Unknown member or channel`)

    return where
}

function replacer(message, member, guild) {
    // {user} - blastyourstuff
    // {@user} - @blastyourstuff
    // {user_tag} - blastyourstuff#0000
    // {guild} - Server Name

    message = message
                    .replace(/{user}/gi, member.user.username)
                    .replace(/{@user}/gi, member)
                    .replace(/{user_tag}/gi, member.user.tag)
                    .replace(/{guild}/gi, guild)
    return message
}