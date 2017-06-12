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
//var publicKey = 'oueWJQg1nz6nY7-6UrV8AXa9hEni9KgwADFVv9dKwTWyc2xCbRaKzwaGP66ndzc2mOTHtw6hyRQG56CEwSgeAqp2onwNqLSpwKLn4JenJ9ZRk_fJBXmGz4lNcRmYwXiAzyNdMf2swmVXdVHC3ybNcehlb0I7bEjbFAOTY7AighM8xKRjN7nAXEHJ3tuptMulVWaarSiAH4HQ1szrTG5tT1RgJpY7utPSW8S3MdxfLWMJpRcP98li9EuQrUCgxcpgs-kWfI4EqlevM091YRM2W7V8t1QhzVoJJFXA-xaSXDC-zcM9zAWkpwTlHCxloiGkpIG60ajJToOg2pcytTi0tw';
//common.toast(rsa.encrypt(publicKey, 'ccc'));