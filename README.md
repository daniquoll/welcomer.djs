# Приветствие участников

Простой способ приветстивия участников и прощания с участниками

[<img src="https://discordapp.com/api/guilds/338202622731485185/widget.png?style=shield">](https://discord.gg/UYYhhDq)

# Установка и запуск

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)

```
git clone https://github.com/blastyourstuff/welcomer.djs.git
cd welcomer.djs
npm install
node index.js
```

## Конфигурационный файл

```javascript
{
    "token": "токен_бота",
    "greeting": {
        "to_dm": false, // Отправлять в личные сообщения? true - да, false - нет
        "channel_id": "id_канала",
        "message": "{@user}, добро пожаловать на {guild}!"
    },
    "farewell": {
        "to_dm": false,
        "channel_id": "id_канала",
        "message": "{user_tag} покинул {guild}! Очень жаль..."
    },
    "presence": {
        "game_name": "Discord", // Название игры
        "type": 0, // Тип игры: 0 - "Играет в", 1 - "Стримит", 2 - "Слушает", 3 - "Смотрит"
        "status": "online", // Отображаемый статус
        "game_url": "https://www.twitch.tv/blastyourstuff" // Ссылка на трансляцию, в случае, если тип игры равен 1
    }
}
```