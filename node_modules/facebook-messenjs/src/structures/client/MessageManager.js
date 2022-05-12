const Collection = require("../Collection");
const Message = require("../message/Message");
const Client = require("./Client");

class MessageManager {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @property {Client} client Facebook Messenger chatbot client
     * @property {Collection} cache Special object for keeping track of messages
     */
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }

    /**
     * @property {Function} fetch Get a message
     * @param {String|Object} idOrPayload ID of message or JSON object containing data of message
     * @returns {Promise<Message>}
     */
    fetch(idOrPayload) {
        return new Promise((resolve, reject) => {
            if (typeof idOrPayload == 'string') {
                resolve(this.cache.get(idOrPayload));
            } else if (typeof idOrPayload == 'object') {
                if (!this.cache.get(idOrPayload)) {
                    let createdMessage = new Message(this.client, idOrPayload);
                    this.cache.set(idOrPayload.message.mid, createdMessage);
                    resolve(createdMessage);
                } else {
                    resolve(this.cache.get(idOrPayload));
                }
            }
        });
    }
}

module.exports = MessageManager;