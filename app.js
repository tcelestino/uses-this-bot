require('dotenv').config();

const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function getInterviews(interviews) {
  return interviews.map(interview => ({
    id: interview.id,
    title: interview.title,
    summary: interview.summary,
    url: interview.url,
    image: interview.image,
    date_published: interview.date_published,
  }));
}

function formatMediaGroup(interviews = []) {
  return interviews.map(interview => ({
    media: interview.image,
    caption: `${interview.title} - ${interviews[0].summary}\n${interview.url}`,
    type: 'photo',
  }));
}

bot.start((context) => {
  const wecolmeText = 'Welcome to @UsesThisBot\nThis bot list the last interviews on usesthis.com website\n You can use this command to interactive:\n-all: list the last interviews\n-last: show the last interview';

  context.reply(wecolmeText);
});

bot.command('all', (context) => {
  axios.get(process.env.USESTHIS_JSON).then((response) => {
    const interviews = formatMediaGroup(getInterviews(response.data.items));

    context.replyWithMediaGroup(interviews);
  });
});

bot.command('last', (context) => {
  axios.get(process.env.USESTHIS_JSON).then((response) => {
    const interviews = getInterviews(response.data.items);

    context.replyWithPhoto(interviews[0].image, {
      caption: `${interviews[0].title} - ${interviews[0].summary}\n${interviews[0].url}`,
    });
  });
});

bot.startPolling();
