'use strict';

const axios = require('axios');
const express = require('express');
const Telegraf = require('telegraf');
const config = require('./config');
const logger = require('./logger');

const bot = new Telegraf(config.TELEGRAM_TOKEN, {
  telegram: {
    webhookReply: false,
  },
});

const fetch = async () => {
  const data = await axios
    .get(config.USES_THIS_JSON)
    .then((res) => res.data.items)
    .catch((error) => {
      logger.error('error json request', error);
    });

  return data;
};

const formatMediaGroup = (interviews = []) =>
  interviews.map((interview) => ({
    media: interview.image,
    caption: `${interview.title} - ${interview.summary}\n${interview.url}`,
    type: 'photo',
  }));

const formatReplyWithPhoto = (interviews = []) => {
  const data = interviews.map((interview) => ({
    image: interview.image,
    title: interview.title,
    summary: interview.summary,
    url: interview.url,
  }));

  return data[0];
};

bot.telegram.getMe().then((botInformations) => {
  logger.info('telegram connected.', {
    botName: botInformations.username,
  });
});

bot.start((context) => {
  const welcomeText =
    'Welcome to @UsesThisBot\nThis bot list interviews published in the usesthis.com website\n Uses commands:\n-latest: list the latest interviews\n-last: show the last interview';

  logger.info('start chat');

  context.reply(welcomeText);
});

bot.command('last', async (context) => {
  const data = await fetch();
  const interview = formatReplyWithPhoto(data);

  logger.info('show last interview', { interview });

  context.replyWithPhoto(interview.image, {
    caption: `${interview.title} - ${interview.summary}\n${interview.url}`,
  });
});

bot.command('latest', async (context) => {
  const data = await fetch();

  context.replyWithMediaGroup(formatMediaGroup(data));
  logger.info('show latest interviews');
});

const app = express();
app.use(bot.webhookCallback('/secret'));

app.get('/', (req, res) => {
  res.send('Uses This Bot');
});

app.get('/secret', async (req, res) => {
  await bot.telegram.setWebhook(`${config.DOMAIN}/secret`);
  res.send('webhook');
});

if (config.NODE_ENV === 'dev') {
  logger.info('listening local');
  bot.launch();

  return;
}

app.listen(config.SERVER_PORT, () => {
  logger.info('server listening on port 3000!');
});
