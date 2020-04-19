# Uses This Bot

> Telegram bot to list the interviews published on [usesthis.com](https://usesthis.com) website.

Use it: http://t.me/UsesThisBot

## How to use

At moment, you can use theses commands:

- last - show the last interview
- latest - show the five latest interviews

## Development

- [yarn](https://yarnpkg.com/)
- [now](https://zeit.co/home)
- [ngrok](https://ngrok.com/)

Clone project `git@github.com:tcelestino/uses-this-bot.git`

`cd uses-this-bot`;

You need create a bot on Telegram. [Read it how to do it](https://core.telegram.org/bots).

Rename `.env.example` file `.env` and set enviroments:

- TELEGRAM_TOKEN - set Telegram bot Token
- USESTHIS_JSON - https://usesthis.com/feed.json
- DOMAIN - ngrok url (read below about it)
- SERVER_PORT - set server local port
- NODE_ENV - set as 'dev'

`yarn && yarn dev`

### Set ngrok tunnel

Download [ngrok](https://ngrok.com/) (it's free, but limited). After that, start using `./ngrok http YOUR_SERVER_PORT`

## Contributing

See in: https://github.com/tcelestino/uses-this-bot/projects/1

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

[@tcelestino](https:/github.com/tcelestino)

Feed data provided by [usesthis.com](https://usesthis.com)

## License

The MIT License (MIT)
