/**
 * @Author : lijian
 * @Timestamp : 2017-05-07
 */
var common = require("util/common");
var codeRep = require("repository/code");
var sysRep = require("repository/system");

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var confirm = ui("confirm");
var password = ui("password");
var do_ImageView = ui('do_ImageView');

getIcon();

function getIcon() {
	var data = sysRep.getUserInformation();
	if (!data) {
		return;
	}
	if (data.icon) {
		do_ImageView.source = data.icon;
	}
}


function login() {
	var text = password.text;
	var obj = sysRep.checkSimPwd(text);
	if (obj.result) {
		codeRep.initDataList();
		do_App.openPage({
			source: "source://view/index.ui",
			animationType: "fade",
			statusBarState: "transparent",
			statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
		});
	} else if (obj.type === 1) {
		common.toast("请使用账号密码登陆");
	}
}
// 确定按钮
confirm.on("touch", function () {
	login();
});

// 键盘enter
password.on("enter", function () {
	login();
})
do_Page.on('loaded', function () {
	sysRep.initCodeTable();
})

confirm.on("touchDown", function () {
	confirm.bgColor = '0080FFFF';
})
confirm.on("touchUp", function () {
	confirm.bgColor = '3F51B5FF';
})