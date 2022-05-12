const EventEmitter = require('events');

const BaseAPI = require('../api/BaseAPI');
// const BaseAPI = require('../api/BaseAPI-old');
const Profile = require('../Profile');
const MessageManager = require('./MessageManager');
const ProfileManager = require('./ProfileManager');

class Client extends EventEmitter {
    /**
     * @param {Object} credObject JSON object with necessary credentials
     * @property {MessageManager} messageManager Property of object for storing messages
     * @property {ProfileManager} profileManager Property of object for storing profiles
     * @property {String} pageToken Page token from Facebook
     * @property {String} verifyToken Token for confirming the API to Facebook
     * @property {String} appID ID of application of chatbot from Facebook
     */
    constructor(credObject) {
        super();

        this.messageManager = new MessageManager(this);
        this.profileManager = new ProfileManager(this);

        if ("pageToken" in credObject) {
            this.pageToken = credObject.pageToken;
        }
        if ("verifyToken" in credObject) { this.verifyToken = credObject.verifyToken; }
        if ("appID" in credObject) {
            if (typeof credObject.appID == 'string') {
                this.appID = credObject.appID;
            } else {
                throw new TypeError("credObject.appID is not a string.");
            }
        }
        if ("appSecret" in credObject) { this.appSecret = credObject.appSecret; }
    }

    /**
     * @property {Function} listen
     * @param {Number} port - Port number of API
     * @param {Function} fn - Function executed after activation of API
     * @returns {void}
     */
    listen(port = 3456, fn = () => {}) {
        this.port = port;
        this.api = new BaseAPI(this);
        this.api.listen(port, fn);

        this.profileManager.cache.set(this.appID, new Profile(this, this.appID));
    }
}

module.exports = Client;