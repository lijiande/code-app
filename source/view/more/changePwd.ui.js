/**
 * related to changePwd.ui
 * 
 * @Author : lijian
 * @Timestamp : 2017-06-14
 */

var do_App = sm("do_App");
var do_Page = sm("do_Page");

var icon_back = ui('do_IconFont_back');

do_Page.on("back", function (data) {
	do_App.closePage({
		animationType: 'push_l2r'
	});
})
icon_back.on('touch',function(){
	do_App.closePage({
		animationType: 'push_l2r'
	});
})