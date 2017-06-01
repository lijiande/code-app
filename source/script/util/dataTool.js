var constants = require("config/constants")
module.exports.encodeKey = encodeKey;
module.exports.getUUID = generateUUID;

function encodeKey(str) {
    return "hello";
}



function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function generateDataList(dataTemp) {
    if (!dataTemp instanceof Array) {
        return
    }
    var indexArray = constants.indexCharArray;
    var param = {};
    var result = {};
    var coin = [{
        template: 0,
        index: '*'
    }];
    indexArray.forEach(x => {
        coin[0].index = x
        param[x] = coin
    })

    dataTemp.forEach(x => {
        param[x.name_index].push({
            'template': '1',
            'title': x.name,
            'id': x.id
        })
    })

    indexArray.forEach(x => {
        if (param[x].length > 1) {
            result[x] = param[x]
        }
    })
}