var d = require("deviceone");
var common = require("util/common");
var codeSql = require("config/codeSql");
var constants = require('config/constants');
var dataTool = require("util/dataTool");
var do_DataCache = d.sm("do_DataCache");

module.exports.checkUserCache = checkUserCache;
module.exports.saveUser = saveUser;

var defaultErrorTimes = 3;
var defaultTimeLength = 10;
/**
 * 检查是否有登陆信息
 */
function checkUserCache() {
    var result = do_DataCache.hasData("user");
    return result;
}

/**
 * 注册新用户
 * @param {*} data 
 */
function saveUser(data) {
    var userName = data.name;
    var userPassword = data.password;
    var user = {};
    user.userName = userName;
    user.userPassword = userPassword;
    do_DataCache.saveData('user', user);
    return true;
}

/**
 * 检查密码是否正确
 * @param {*} data 
 */
function checkUser(data) {
    var user = do_DataCache.loadData('user');
    if (!user)
        return false;
    if (user.userName === data.name) {
        if (user.userPassword === data.password) {
            return true;
        } else {
            addErrorTimes();
            return false;
        }
    } else {
        common.toast('用户名错误');
        return false;
    }
}

/**
 * 增加密码错误次数
 */
function addErrorTimes() {
    var obj = {};
    var nowTime = new Date().getTime();
    if (do_DataCache.hasData('errorTimes')) {
        obj = do_DataCache.loadData('errorTimes');
        var timelength = (nowTime - obj.time) / 1000 / 60;
        if (timelength < defaultTimeLength) {
            obj.times = obj.times + 1;
        } else {
            obj.times = 1;
        }
    } else {
        obj.times = 1;
    }
    if (obj.times >= defaultErrorTimes) {
        common.toast('密码错误' + defaultErrorTimes + '次，请稍后再试')
    } else {
        common.toast('密码错误，还有' + (defaultErrorTimes - obj.times) + '次机会');
        obj.time = nowTime;
        do_DataCache.saveData('errorTimes', obj);
    }
}

/**
 * 获取当前用户的用户名
 */
function getUserName() {
    if (checkUserCache) {
        var user = do_DataCache.loadData('user');
        return user.userName;
    } else {
        return false;
    }

}