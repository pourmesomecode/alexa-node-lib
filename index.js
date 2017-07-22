import express from 'express';

import validation from './lib/validation';

const server = express();
const alexaNode = {};

alexa.app = (name, skillID, port) => {
  server.post('/', validation, (req, res) => {
    console.log(res, '<<<');
  });

  server.listen(process.env.PORT || port, () => {
    console.log(`Server currently running on port ${port}`)
  });
};

alexaNode.intent = () => {

};

alexaNode.slot = () => {

};

alexaNode.response = () => {

};

