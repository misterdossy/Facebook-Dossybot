class BaseQuickReply {
    /**
     * @param {String} contentType Type of quick reply (can be text, user_phone_number, or user_email)
     * @property {String} contentType Type of quick reply (can be text, user_phone_number, or user_email)
     */
    constructor(contentType) {
        this.contentType = contentType;
    }

    /**
     * @property {Function} getJSON Gets the quick reply in JSON format
     * @returns {Object}
     */
    getJSON() {
        return {
            content_type: this.contentType
        }
    }
}

module.exports = BaseQuickReply;