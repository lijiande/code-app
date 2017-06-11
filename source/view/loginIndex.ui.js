/**
 * related to loginIndex.ui
 * 
 * @Author : lijian
 * @Timestamp : 2017-06-11
 */


var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var common = require("util/common");
var sysRep = require('repository/system');
var pageUi = require("ui");

pageUi.init();

var do_ViewShower_main = ui("do_ViewShower_main");

var viewShower_data = [{
		"id": "regist",
		"path": "source://view/login/regist.ui"
	},
	{
		"id": "simLogin",
		"path": "source://view/login/simLogin.ui"
	},
	{
		"id": "login",
		"path": "source://view/login/login.ui"
	}
];
do_ViewShower_main.addViews(viewShower_data);
var viewId = 'regist';
if (sysRep.checkUserCache()) {
	if (sysRep.getOpenSimLogin()) {
		viewId = 'simLogin';
	} else {
		viewId = 'login';
	}
} else {
	sysRep.sysReset();
}
do_ViewShower_main.showView(viewId, "fade");