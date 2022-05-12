const Client = require("../client/Client");
const BaseEvent = require("./BaseEvent");

class DeliveryEvent extends BaseEvent{
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} payload Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Sender of message
     * @property {Profile} recipient Recipient of message
     * @property {Number} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Message} message Message delivered
     * @property {Number} watermark
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: 0,
        delivery: { mids: [], watermark: 0 }
    }) {
        super(client, payload, payload.timestamp);

        this.sender = client.profileManager.fetch(payload.sender.id, "profile");
        this.recipient = client.profileManager.fetch(payload.recipient.id, "profile");
        this.timestamp = payload.timestamp;
        this.message = client.messageManager.cache.get(payload.delivery.mids[0]);
        this.watermark = payload.delivery.watermark;
    }
}

module.exports = DeliveryEvent;