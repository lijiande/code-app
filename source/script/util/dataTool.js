var d = require("deviceone");

module.exports.encodeKey = encodeKey;
module.exports.getUUID = generateUUID;

function encodeKey(str) {
	return "hello";
}



function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}