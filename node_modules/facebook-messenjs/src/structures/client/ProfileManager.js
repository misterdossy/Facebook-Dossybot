const Collection = require("../Collection");
const Profile = require("../Profile");
const Client = require("./Client");

class ProfileManager {
    /**
     * @param {Client} client Facebook Messenger chatbot client
     * @property {Client} client Facebook Messenger chatbot client
     * @property {Collection} cache Special object for keeping track of profiles
     */
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }

    /**
     * @property {Function} fetch Get a profile
     * @param {String} id ID of profile
     * @returns {Promise<Profile>|Profile}
     */
    fetch(id, returnType = "promise") {
        if (returnType == "promise") {
            return new Promise((resolve, reject) => {
                if (this.cache.get(id)) {
                    resolve(this.cache.get(id));
                } else {
                    let createdProfile = new Profile(this.client, id);
                    this.cache.set(id, createdProfile);
                    resolve(createdProfile);
                }
            })
        } else if (returnType == "profile") {
            if (this.cache.get(id)) {
                return this.cache.get(id);
            } else {
                let createdProfile = new Profile(this.client, id);
                this.cache.set(id, createdProfile);
                return createdProfile;
            }
        }
    }
}

module.exports = ProfileManager;