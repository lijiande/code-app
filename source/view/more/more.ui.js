var pageUi = require("ui");
pageUi.security();
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Label_version = ui("do_Label_version");
var alayout_pwd = ui('do_ALayout_modipwd');

do_Label_version.text = '版本号:'+ do_Global.getVersion().ver;

alayout_pwd.on('touch',function(){
	do_App.openPage({
		source: "source://view/more/changePwd.ui",
		statusBarState: "show",
		animationType: "push_r2l",
		statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
	});
})