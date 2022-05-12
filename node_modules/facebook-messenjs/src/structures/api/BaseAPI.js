const http = require("http");
const url = require('url');

const crypto = require('crypto');

const Message = require('../message/Message');
const Client = require('../client/Client');
const events = require('../events/events');
const readJSONBody = require("./readJSONBody");

const sendUnauthorized = (res) => {
    res.writeHead(403, { "Content-Type": "text/html" });
    res.end("Unauthorized.");
}

class BaseAPI {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @property {Client} client Facebook Messenger chatbot client of BaseAPI
     */
    constructor(client, route = "/") {
        this.client = client;
        this.app = http.createServer(async (req, res) => {
            const reqURL = url.parse(req.url, true);
            if (reqURL.pathname === route) {
                if (req.method === "GET") {
                    if (("hub.challenge" in reqURL.query) && ("hub.verify_token" in reqURL.query)) {
                        if (reqURL.query["hub.verify_token"] == client.verifyToken) {
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.end(reqURL.query["hub.challenge"]);
                        } else {
                            sendUnauthorized(res);
                        }
                        
                        this.client.emit("webhookVerify", {
                            success: reqURL.query["hub.verify_token"] == client.verifyToken,
                            date: new Date()
                        });
                    } else {
                        sendUnauthorized(res);
                    }

                    return;
                } else if (req.method === "POST") {
                    if (!("x-hub-signature" in req.headers)) {
                        sendUnauthorized(res);
                        return;
                    }

                    if (req.readable) {
                        const rawJSONString = await readJSONBody(req);
                        const jsonData = JSON.parse(rawJSONString);

                        let hubSignature = req.headers["x-hub-signature"];
                        let expectedSignature = `sha1=${
                            crypto.createHmac('sha1', this.client.appSecret)
                                .update(rawJSONString)
                                .digest("hex")
                        }`;

                        if (hubSignature != expectedSignature) {
                            sendUnauthorized(res);
                            return;
                        }

                        if ("messaging" in jsonData.entry[0]) {
                            let payload = jsonData.entry[0].messaging[0];
                            if ("message" in payload) {
                                let msgEvtData = new Message(this.client, payload);

                                /**
                                 * Receive message event
                                 * @event Client#messaging
                                 * @type {Message}
                                 */
                                this.client.emit("messages", msgEvtData);
                            } else if ("read" in payload) {
                                let readEvtData = new events.ReadEvent(this.client, payload.read[0]);

                                /**
                                 * Receive message event
                                 * @event Client#messageRead
                                 * @type {ReadEvent}
                                 */
                                this.client.emit("messageRead", readEvtData);
                            } else if ("delivery" in payload) {
                                let deliveryEvtData = new events.DeliveryEvent(this.client, payload);

                                /**
                                 * Receive message event
                                 * @event Client#messageRead
                                 * @type {ReadEvent}
                                 */
                                this.client.emit("messageDelivery", deliveryEvtData);
                            } else if ("reaction" in payload) {
                                let reactionEvtData = new events.ReactionEvent(this.client, payload);

                                /**
                                 * Receive message event
                                 * @event Client#messageRead
                                 */
                                this.client.emit("messageReaction", reactionEvtData);
                            }
                        }
                    }

                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end("awts gege");
                }
            }
        });
    }

    /**
     * @param {Number} port Port number of API
     * @param {Function} fn Function executed after activation of API
     */
    listen(port, fn) { this.app.listen(port, fn); }
}

module.exports = BaseAPI;