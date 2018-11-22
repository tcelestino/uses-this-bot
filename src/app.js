process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const wecolmeText = '<b>Welcome to @UsesThisBot</b>\nThis bot list the last interviews on usesthis.com website\n You can use this command to interactive:\n-all: list the last interviews\n-last: show the last interview';
  bot.sendMessage(msg.chat.id, wecolmeText, { parse_mode: "HTML"});
});
