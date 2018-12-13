require('dotenv').config();

const Telegraf = require('telegraf');
// const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply('Welcome to @UsesThisBot'));


bot.startPolling();
