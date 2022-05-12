const Client = require('../client/Client');

class Message {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} [payload] JSON object with data of message
     * @property {Client} client Facebook Messenger chatbot client
     * @property {Object} payload JSON object with data of message
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {String} id ID of message
     * @property {string} text Text of message
     * @property {Array} quickReplies Quick replies of message
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: new Date().getTime(),
        message: {
            mid: "",
            text: text
        }
    }) {
        this.client = client;
        this.payload = payload;
        this.sender = client.profileManager.fetch(payload.sender.id, "profile");
        this.recipient = client.profileManager.fetch(payload.recipient.id, "profile");
        this.timestamp = payload.timestamp;
        this.id = payload.message.mid;
        this.text = payload.message.text;
        this.quickReplies = [];

        if ("quick_reply" in payload.message) {
            this.quickReplyPayload = payload.message.quick_reply.payload;
        }

        this.client.messageManager.cache.set(this.id, this);
    }
}

module.exports = Message;