process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

function content(interviews) {
  return interviews.map(interview => ({
    id: interview.id,
    title: interview.title,
    url: interview.url,
    image: interview.image,
    date_published: interview.date_published,
  }));
}

bot.onText(/\/start/, (msg) => {
  const wecolmeText = '<b>Welcome to @UsesThisBot</b>\nThis bot list the last interviews on usesthis.com website\n You can use this command to interactive:\n<b>-all: list the last interviews</b>\n<b>-last: show the last interview</b>';
  bot.sendMessage(msg.chat.id, wecolmeText, { parse_mode: 'HTML' });
});

bot.onText(/\/all/, (msg) => {
  axios.get(process.env.USESTHIS_JSON).then((response) => {
    const interviews = content(response.data.items);

    for (let index = 0; index < interviews.length; index += 1) {
      bot.sendPhoto(msg.chat.id, interviews[index].image, {
        caption: `${interviews[index].title}\n${interviews[index].url}`,
        parse_mode: 'HTML',
      });
    }
  });
});

bot.onText(/\/last/, (msg) => {
  axios.get(process.env.USESTHIS_JSON).then((response) => {
    const interviews = content(response.data.items);

    bot.sendPhoto(msg.chat.id, interviews[0].image, {
      caption: `${interviews[0].title}\n${interviews[0].url}`,
      parse_mode: 'HTML',
    });
  });
});
