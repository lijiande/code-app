var d = require("deviceone");
var constants = require("config/constants");
var common = require("util/common");

module.exports.encodeKey = encodeKey;
module.exports.getUUID = generateUUID;
module.exports.getNameIndex = getNameIndex;
module.exports.generateDataList = generateDataList;
module.exports.encryptRemark = encryptRemark;
module.exports.decryptRemark = decryptRemark;

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

/**
 *  生成nameIndex
 * @param {*} str 
 */
function getNameIndex(str) {
    common.toast(str);
    var char = str.charAt(0);
    var reg = new RegExp('^[a-zA-Z]$');
    if (reg.test(char)) {
        char = char.toUpperCase();
    } else {
        char = '#';
    }
    return char;
}

/**
 * 生成数据列
 * @param {*} source 
 */
function generateDataList(source) {
    if (!source instanceof Array) {
        return
    }
    var indexs = constants.getCon().indexCharArray;
    var param = {};
    var result = {};
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

function encryptRemark(str) {
    if (str) {
        var length = str.length;
        var numArray = [];
        for (var a = 0; a < length; a++) {
            numArray.push(str.charCodeAt(a) - 5);
        }
        var result = '';
        numArray.forEach(function (data) {
            result = result.concat(String.fromCharCode(data));
        })
        return result;
    } else {
        return '';
    }

}

function decryptRemark(str) {
    if (str) {
        var length = str.length;
        var numArray = [];
        for (var a = 0; a < length; a++) {
            numArray.push(str.charCodeAt(a) + 5);
        }
        var result = '';
        numArray.forEach(function (data) {
            result = result.concat(String.fromCharCode(data));
        })
        return result;
    } else {
        return '';
    }

}