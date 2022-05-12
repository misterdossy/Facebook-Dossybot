const fetch = require('make-fetch-happen');

class BaseAttachment {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @param {String} type Type of attachment
     * @param {String} url URL of attachment
     * @param {Boolean} [reusable]
     * @param {String} [id] ID of attachment
     * @property {Client} client Facebook Messenger chatbot client
     * @property {String} type Type of attachment
     * @property {String} url URL of attachment
     * @property {Boolean} reusable
     * @property {String} id ID of attachment
     */
    constructor(client, type, url, reusable = true, id = null) {
        this.client = client;
        this.type = type;
        this.url = url;
        this.reusable = reusable;

        if (id) {
            this.id = id;
        } else {
            fetch(`https://graph.facebook.com/v13.0/me/message_attachments?access_token=${this.client.pageToken}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: {
                        attachment: {
                            type: this.type,
                            payload: {
                                url: this.url,
                                is_reusable: this.reusable
                            }
                        }
                    }
                })
            })
                .then(res => res.json())
                .then(json => {
                    this.id = json.attachment_id;
                });
        }
    }

    /**
     * @property {Function} getJSON
     * @returns {Object}
     */
    getJSON() {
        return {
            type: this.type,
            payload: {
                attachment_id: this.id
            }
        }
    }
}

module.exports = BaseAttachment;