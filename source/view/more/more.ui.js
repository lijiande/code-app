var pageUi = require("ui");
pageUi.security();
var do_Global = sm("do_Global");
var do_Label_version = ui("do_Label_version");
var alayout_pwd = ui('do_ALayout_modipwd');

do_Label_version.text = '版本号:'+ do_Global.getVersion().ver;

alayout_pwd.on('touch',function(){
	
})