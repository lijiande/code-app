var constants = require("config/constants");
var common = require("util/common");

module.exports.encodeKey = encodeKey;
module.exports.getUUID = generateUUID;
module.exports.generateDataList = generateDataList;

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
    var indexs = constants.conMap().indexCharArray;
    var param = {};
    var result = {};
    common.toast(indexs);
    indexs.forEach(function (x) {
        param[x] = [{
            template: 0,
            index: x
        }];
    })
    source.forEach(function (x) {
        param[x.name_index].push({
            'template': '1',
            'name': x.name,
            'id': x.id
        })
    })

    indexs.forEach(function (x) {
        if (param[x].length > 1) {
            result[x] = param[x];
        }
    })
    return result;
}