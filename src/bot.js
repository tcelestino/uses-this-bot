const Telegraf = require('telegraf');
const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

const bot = new Telegraf(config.TELEGRAM_TOKEN);

function log(message, infos, type = 'info') {
  let dataInfo = {};

  if (infos.chat) {
    const {
      id,
    } = infos.chat;

    dataInfo = {
      chatId: id,
    };
  } else {
    dataInfo = infos;
  }

  switch (type) {
    case 'error':
      logger.error(message, dataInfo);
      break;
    default:
      logger.info(message, dataInfo);
      break;
  }
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

function botCommand(command, callback) {
  bot.command(command, (context) => {
    axios.get(config.USES_THIS_JSON).then((res) => {
      callback(context, res.data.items);
    }).catch((error) => {
      log('error json request', error, 'error');
      callback(error);
    });
  });
}

bot.telegram.getMe().then((botInformations) => {
  log('server has initialized.', {
    botName: botInformations.username,
  });
});

bot.start((context) => {
  const welcomeText = 'Welcome to @UsesThisBot\nThis bot list interviews published in the usesthis.com website\n You can use these commands:\n-all: list the last interviews\n-last: show the last interview';

  log('start chat', context);

  context.reply(welcomeText);
});

botCommand('all', (context, response) => {
  const interviews = formatMediaGroup(getInterviews(response));

  log('list all interviews', context);

  context.replyWithMediaGroup(interviews);
});

botCommand('last', (context, response) => {
  const interviews = getInterviews(response);

  log('last interview', context);

  context.replyWithPhoto(interviews[0].image, {
    caption: `${interviews[0].title} - ${interviews[0].summary}\n${interviews[0].url}`,
  });
});

bot.launch();
