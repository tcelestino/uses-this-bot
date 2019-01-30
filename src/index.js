const Telegraf = require('telegraf');
const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

const bot = new Telegraf(config.TELEGRAM_TOKEN);

function log(message = 'Log information', infos) {
  /* eslint-disable camelcase */
  const {
    user_id,
    user_name,
    first_name,
    last_name,
  } = infos;

  logger.info(message, {
    userId: user_id,
    username: user_name,
    name: `${first_name} ${last_name}`,
  });
}

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
    caption: `${interview.title} - ${interview.summary}\n${interview.url}`,
    type: 'photo',
  }));
}

function botCommand(command = '', callback) {
  bot.command(command, (context) => {
    axios.get(config.USES_THIS_JSON).then((response) => {
      callback(context, response.data.items);
    }).catch((error) => {
      callback(error);
    });
  });
}

bot.start((context) => {
  log(context.chat);

  const welcomeText = 'Welcome to @UsesThisBot\nThis bot list interviews published in the usesthis.com website\n You can use these commands:\n-all: list the last interviews\n-last: show the last interview';

  context.reply(welcomeText);
});

botCommand('all', (context, response) => {
  const interviews = formatMediaGroup(getInterviews(response));

  context.replyWithMediaGroup(interviews);
});

botCommand('last', (context, response) => {
  const interviews = getInterviews(response);

  context.replyWithPhoto(interviews[0].image, {
    caption: `${interviews[0].title} - ${interviews[0].summary}\n${interviews[0].url}`,
  });
});

bot.startPolling();
