var constants = require("config/constants");


module.exports.encodeKey = encodeKey;
module.exports.getUUID = generateUUID;
module.exports.getDataList = generateDataList;

function encodeKey(str) {
    return "hello";
}


/**
 * 生成UUID
 * @returns
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function generateDataList(source) {
    if (!source instanceof Array) {
        return
    }
    var indexs = [];
    var ss = [];
    var inarry = constants.conMap().indexCharArray;
    var param = {};
    var result = {};
    var coin = [{
        template: 0,
        index: '*'
    }]
    inarry.forEach(function (x) {
        coin[0].index = x
        param[x] = coin
    })
    source.forEach(function (x) {
        param[x.name_index].push({
            'template': '1',
            'title': x.name,
            'id': x.id
        })
    })

    inarry.forEach(function (x) {
        if (param[x].length > 1) {
            result[x] = param[x]
        }
    })
}