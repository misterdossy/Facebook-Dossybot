# Facebook MessenJS
Facebook MessenJS is an API wrapper for Facebook Messenger inspired by [discord.js](https://discord.js.org/) that allows you to interact with [Facebook Messenger's API](https://developers.facebook.com/docs/messenger-platform/). The bot was programmed with an object-oriented approach so that people can program their Facebook Messenger chatbots with ease.

## Example
### Installation
```
npm i facebook-messenjs
```

### Simple Chatbot
``` js
const { Client } = require('facebook-messenjs');

const bot = new Client({
    pageToken: "PAGE_TOKEN_FROM_FACEBOOK",
    verifyToken: "YOUR_VERIFY_TOKEN",
    appID: "APP_ID_FROM_FACEBOOK"
});

// Allows Facebook to know that you set the URL of the bot properly
bot.on('webhookVerify', verification => {
    if (verification.success) {
        console.log("Webhook verified with Facebook successfully!");
    } else {
        console.log("Webhook verified with Facebook failed! ;-;");
    }
});

// Processes messages from people who message the Facebook page
bot.on("messages", message => {
    message.sender.send("Hi!");
});

// Turns on the bot at port 5566
bot.listen(5566, () => {
    console.log(`Facebook Messenger chatbot listening at http://localhost:${bot.port}`);
})
```