/**
 * @Author : lijian
 * @Timestamp : 2017-05-07
 */
var common = require("util/common");
var dataSource = require("util/dataSource");
var pageUi = require("ui");

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");


var confirm = ui("confirm");
var password = ui("password");
// 初始化
pageUi.init();


// 确定按钮
confirm.on("touch",function(){
	var text = password.text;
	if(text == '123'){
		dataSource.initData();
		do_App.openPage({
			source:"source://view/index.ui", 
			animationType: "fade"		
		});
	}else {
		common.toast("密码错误");
	}
});



