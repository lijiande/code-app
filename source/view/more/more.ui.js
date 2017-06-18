var pageUi = require("ui");
var common = require("util/common");
var sysRep = require('repository/system');
pageUi.security();

var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Album = sm('do_Album');

var do_ImageView = ui('do_ImageView');
var do_Label_version = ui("do_Label_version");
var alayout_pwd = ui('do_ALayout_modipwd');
var userName = ui('do_Label_userName');
var do_Button_simLogin = ui('do_Button_simLogin');

do_Label_version.text = '版本号:' + do_Global.getVersion().ver;
flushPage();
flushSimLogin();

/**
 * 刷新页面
 */
function flushPage() {
	var data = sysRep.getUserInformation();
	if (!data) {
		return;
	}
	if (data.icon) {
		do_ImageView.source = data.icon;
	}
	userName.text = data.userName;
}

/**
 * 刷新简单登陆选项
 */
function flushSimLogin() {
	var data = sysRep.getOpenSimLogin();
	if (data) {
		do_Button_simLogin.text = '立即关闭';
		do_Button_simLogin.fontColor = '808080FF';
	} else {
		do_Button_simLogin.text = '立即开启';
		do_Button_simLogin.fontColor = '000000FF';
	}
}



/**
 * 修改密码
 */
alayout_pwd.on('touch', function () {
	do_App.openPage({
		source: "source://view/more/changePwd.ui",
		animationType: "push_r2l",
		statusBarState: "transparent",
		statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
	});
})

/**
 * 更换头像
 */
do_ImageView.on('touch', function () {
	do_Album.select(1, 300, 300, 80, true, function (data, e) {
		var url = data[0];
		sysRep.setUserIcon(url);
		flushPage();
	})
})

do_Button_simLogin.on('touch', function () {
	sysRep.simLoginSwatch();
	flushSimLogin();
})