var d = require("deviceone");
var constants = require("config/constants");
var cacher = sm("do_DataCache");

module.exports.getListData = getListData;
module.exports.setListData = setListData;
cacher.saveData("user", {
    'userName': '123',
    'password': '123'
});

function getListData() {
    var data = cacher.loadData(constants.getCon().dataListName);
    return data;
}

function setListData(data) {
    var dataListName = constants.getCon().dataListName;
}