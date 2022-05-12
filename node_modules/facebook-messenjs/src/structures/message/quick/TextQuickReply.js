const BaseQuickReply = require('./BaseQuickReply');

class TextQuickReply extends BaseQuickReply{
    /**
     * @param {String} title Text in quick reply
     * @param {String} payload Special code to know that they pressed the button 
     * @param {String} [imageURL] URL of image for quick reply
     * @property {String} contentType Type of quick reply (can be text, user_phone_number, or user_email)
     * @property {String} title Text in quick reply
     * @property {String} payload Special code to know that they pressed the button 
     * @property {String} imageURL URL of image for quick reply
     */
    constructor(title, payload, imageURL = null) {
        super("text");
        this.title = title;
        this.payload = payload;
        this.imageURL = imageURL;
    }

    /**
     * @property {Function} getJSON
     * @returns {Object}
     */
    getJSON() {
        return {
            content_type: this.contentType,
            title: this.title,
            payload: this.payload,
            image_url: this.imageURL
        }
    }
}

module.exports = TextQuickReply;