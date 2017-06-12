var d = require("deviceone");
var common = require("util/common");
var codeSql = require("config/codeSql");
var constants = require('config/constants');
var dataTool = require("util/dataTool");
var do_DataCache = d.sm("do_DataCache");

// 检查初始化code表
module.exports.initCodeTable = initCodeTable;
// 检查当前是否有用户缓存
module.exports.checkUserCache = checkUserCache;
// 保存用户
module.exports.saveUser = saveUser;
// 登陆验证
module.exports.checkUser = checkUser;

// 是否开启简单登陆-简单登陆密码验证
module.exports.getOpenSimLogin = getOpenSimLogin;
module.exports.checkSimPwd = checkSimPwd;

// 系统重置
module.exports.sysReset = sysReset;

// 测试专用
module.exports.test = test;

var defaultErrorTimes = 3;
var defaultTimeLength = 10;

// 准备好数据库
var main_data = d.mm("do_SQLite", "main");
main_data.open("data://code_main.db");
// --------------------------------以下是系统级操作

function test() {
    common.toast('test');
}

/**
 * 检查表格，并创建
 * @returns true-执行成功，false-执行失败
 */
function initCodeTable() {
    d.print("start init method", "initCodeTable");
    if (checkTable("code")) {
        return true;
    }
    var sql = codeSql.getSql().createCodeTable.sql;
    var result = main_data.executeSync(sql);
    if (result) {
        common.toast("初始化数据成功");
        return true;
    } else {
        common.toast("系统异常");
        return false;
    }
}

// 系统清除
function sysReset() {
    if (checkTable("code")) {
        var sql = codeSql.getSql().dropTable.sql;
        var result = main_data.executeSync(sql);
        if (result) {
            var result1 = do_DataCache.removeAll();
            if (result1) {
                common.toast("系统初始化成功");
                return true;
            }
        }
        common.toast("系统初始化失败");
        return false;
    } else {
        return true;
    }
}



/**
 * 检查表是否存在
 * @param tableName
 * @returns true-存在，false-不存在
 */
function checkTable(tableName) {
    var sql = codeSql.getSql().checkTable.sql;
    var result = main_data.querySync(sql, [tableName])[0].num == 1 ? true : false;
    d.print(result, "checkTable");
    return result;
}



// --------------------------------以下是用户操作
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
    if (checkUserCache()) {
        common.toast("当前注册不可以用");
        return false;
    }
    var userName = data.userName;
    var userPassword = data.userPassword;
    var user = {};
    user.userName = userName;
    user.userPassword = userPassword;
    user.simSwatch = true;
    user.simPwd = userPassword;
    do_DataCache.saveData('user', user);
    return true;
}

/**
 * 检查密码是否正确
 * @param {*} data 
 */
function checkUser(data) {
    if (!data.userName || !data.userPassword) {
        return false;
    }
    if (errorTimesIsFull()) {
        return false;
    }
    var user = do_DataCache.loadData('user');
    if (!user || !user.userName || !user.userPassword) {
        return false;
    }
    if (user.userName === data.userName) {
        if (user.userPassword === data.userPassword) {
            do_DataCache.removeData('errorTimes');
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
 * @returns true-次数已满
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
    obj.time = nowTime;
    if (obj.times <= defaultErrorTimes) {
        do_DataCache.saveData('errorTimes', obj);
    }
    if (obj.times >= defaultErrorTimes) {
        common.toast('密码已错误' + defaultErrorTimes + '次，请稍后再试');
    } else {
        common.toast('密码错误，还有' + (defaultErrorTimes - obj.times) + '次机会');
    }
}
/**
 * 密码错误次数是否已满
 */
function errorTimesIsFull() {
    var obj = {};
    var nowTime = new Date().getTime();
    if (do_DataCache.hasData('errorTimes')) {
        obj = do_DataCache.loadData('errorTimes');
        var timelength = (nowTime - obj.time) / 1000 / 60;
        if (timelength > defaultTimeLength) {
            return false;
        }
        if (obj.times >= defaultErrorTimes) {
            common.toast('密码已错误' + defaultErrorTimes + '次，请稍后再试');
            d.print(true, 'flageTest');
            return true;
        } else {
            return false;
        }
    } else {
        return false;
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
/**
 * 是否开启简单登陆
 */
function getOpenSimLogin() {
    var user = do_DataCache.loadData('user');
    if (user) {
        return user.simSwatch;
    } else {
        return false;
    }
}

/**
 * 检查简单登陆密码的正误
 */
function checkSimPwd(str) {
    var obj = {};
    obj.result = false;
    d.print(getOpenSimLogin(), 'getOpenSimLogin');
    if (getOpenSimLogin()) {
        if (errorTimesIsFull()) {
            var user = do_DataCache.loadData('user');
            user.simSwatch = false;
            do_DataCache.saveData('user', user);
            d.print(1, 'flageTest');
            obj.type = 1;
            return obj;
        }
        var user = do_DataCache.loadData('user');
        if (str === user.simPwd) {
            obj.result = true;
            return obj;
        } else {
            addErrorTimes();
        }
    } else {
        d.print(2, 'flageTest');
        obj.type = 1;
    }
    return obj;
}