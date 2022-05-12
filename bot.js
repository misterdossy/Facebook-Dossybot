const { Client } = require('facebook-messenjs');

const bot = new Client({
    botToken: "EAAGdrJ1X8KUBAIMXFIs8iyj5tRLKip2eXOszCv1jFPcuwvkwgTZAZBZAL08XSlgyier6AZAqpe49iCYMF0HbSDID28J2DDVJouZBZAbqraZC9d6DnDjQYdkcvT0zqjlF2arpgkdBO26d7oHdvXYzyQThc1r4ZAgnhnUKoGaCWSyn4aidMSZA6MpFv",
    verifyToken: "abcdef",
    appID: "454839676432549",
    appSecret: "5108a5c57664bdf8355aa93093952c1f"
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

let port = process.env.PORT || 3000;
bot.listen(port, () => {
    console.log(`Facebook Messenger chatbot listening at http://localhost:${bot.port}`);
})