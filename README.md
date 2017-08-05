# alexa-node-lib

* A very light-weight node library for writing Alexa skills.

-----
If you're looking for a more feature rich Alexa lib for node I think https://github.com/alexa-js/alexa-app is very good.
-----

- Example using Express

```
const express = require('express');
const alexa = require('alexa-node-lib');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.json({ message: 'error' });
});

app.post('/api', (req, res) => {
  alexa.say(res, 'Text');
});

app.listen(app.get('port'), () => {
  console.log(`running on port ${app.get('port')}`);
});

```

- Say method

Alexa has it's own markup language called `SSML`. When sending a `json` response back to Alexa you can either set the type as `PlainText` or `SSML`.

We always set it as `SSML` the `alexa.say()` method automatically wraps your text in `<speak>` tags.

So you can call the method, pass in the `res` object and give it a text value.

```
alexa.say(res, 'This is what Alexa will say');
```

* SessionEnd
Alexa also allows you to send a `shouldEndSession` value back with true or false which will end the conversation immediately on Alexa's side or keep the convo open.

Note: Leaving the convo open will error out since you only have a small window to keep the skill listening before Alexa sends a _"I don't know"_ type response back to use.

* Reprompt
If can also pass into the `say` method reprompt text.

- Example of say method

```
alexa.say(res, 'text alexa will say', 'text for the reprompt', true);
```
