/**
 * related to login.ui
 * 
 * @Author : lijian
 * @Timestamp : 2017-06-10
 */

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var pageUi = require("ui");
var common = require("util/common");

var user_name_text = ui("do_TextField_name");
var user_pwd_text = ui("do_TextField_pwd");

var canvas_name = ui("do_Canvas_name");
var canvas_pwd = ui("do_Canvas_pwd");
var button_login = ui("do_Button_login");
var sysRep = require('repository/system');
canvas_name.defineLine({
    x: 1,
    y: 10
}, {
    x: 299,
    y: 10
});
canvas_pwd.defineLine({
    x: 1,
    y: 10
}, {
    x: 299,
    y: 10
});


button_login.on("touch", function () {
    var user = {};
    user.userName = user_name_text.text;
    user.userPassword = user_pwd_text.text;
    if (!user.userName) {
        common.toast("请输入用户名");
        return;
    } else if (!user.userPassword) {
        common.toast("请输入密码");
        return;
    }
    var result = sysRep.checkUser(user);
    if (result) {
        do_App.openPage({
            source: "source://view/index.ui",
            animationType: "fade",
            statusBarState: "transparent",
            statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
        });
    } else {
        return;
    }
})

button_login.on("touchDown", function () {
    button_login.bgColor = '0080FFFF';
})
button_login.on("touchUp", function () {
    button_login.bgColor = '3F51B5FF';
})