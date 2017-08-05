var alexa = {};

alexa.say = function (res, text, repromtText, sessionEnd) {
  if (repromtText === null || repromtText === undefined) {
    repromtText = false;
  }
  if (sessionEnd === null || sessionEnd === undefined) {
    sessionEnd = false;
  }
  res.json({
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: '<speak>' + text + '</speak>',
      },
      reprompt: {
        outputSpeech: {
          type: 'SSML',
          text: '<speak>' + repromtText + '</speak>',
        },
      },
      shouldEndSession: sessionEnd,
    },
  });
};

module.exports = alexa;
