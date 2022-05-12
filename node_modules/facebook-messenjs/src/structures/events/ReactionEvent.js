const Profile = require('../Profile');
const BaseEvent = require('./BaseEvent');

class ReactionEvent extends BaseEvent {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {Object} payload Object with data about event
     * @property {Client} client Messenger chatbot client
     * @property {Profile} sender Person who reacted
     * @property {Profile} recipient Recipient of reaction
     * @property {String} timestamp When event happened in number of seconds since January 1, 1970
     * @property {Message} message Message of reaction
     * @property {String} action "react" or "unreact"
     * @property {String} emoji Emoji of reaction
     * @property {String} reaction Emoji of reaction in the form of a name
     */
    constructor(client, payload = {
        sender: { id: "" },
        recipient: { id: "" },
        timestamp: "",
        reaction: {
            mid: "",
            action: "",
            emoji: "",
            reaction: ""
        }
    }) {
        super(client, payload, payload.timestamp);

        this.sender = new Profile(client, payload.sender.id);
        this.recipient = new Profile(client, payload.recipient.id);
        this.timestamp = payload.timestamp;
        this.message = client.messageManager.cache.get(payload.reaction.mid);
        this.action = payload.reaction.action;
        this.emoji = payload.reaction.emoji;
        this.reaction = payload.reaction.reaction;
    }
}

module.exports = ReactionEvent;