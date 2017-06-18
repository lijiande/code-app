/**
 * related to changePwd.ui
 * 
 * @Author : lijian
 * @Timestamp : 2017-06-14
 */
var pageUi = require("ui");
var sysRep = require('repository/system');
var common = require("util/common");
pageUi.security();

var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");

var icon_back = ui('do_IconFont_back');
var button_confirm = ui('do_Button_confirm');
var text_old = ui('do_TextField_old');
var text_new = ui('do_TextField_new');
var text_confirm = ui('do_TextField_confirm')

var canvas_old = ui('do_Canvas_old');
var canvas_new = ui('do_Canvas_new');
var canvas_confirm = ui('do_Canvas_confirm');

canvas_old.defineLine({
	x: 1,
	y: 3
}, {
	x: 349,
	y: 3
});
canvas_new.defineLine({
	x: 1,
	y: 3
}, {
	x: 349,
	y: 3
});
canvas_confirm.defineLine({
	x: 1,
	y: 3
}, {
	x: 349,
	y: 3
});

button_confirm.on('touch', function () {
	var oldText = text_old.text;
	var newText = text_new.text;
	var confirm = text_confirm.text;
	if (!oldText) {
		common.toast('旧密码不能为空');
		return;
	}
	if (!newText) {
		common.toast('新密码不能为空');
		return;
	}
	if (newText != confirm) {
		common.toast('两次密码不一致');
		return;
	}
	do_Notification.confirm('确认修改密码吗', '提 醒', '否', '是', function (data, e) {
		if (data === 2) {
			var result = sysRep.changePwd(oldText, newText);
			if (result) {
				do_App.closePage({
					animationType: 'push_l2r'
				});
			}
		}
	})
})

button_confirm.on("touchDown", function () {
	button_confirm.bgColor = '0080FFFF';
})
button_confirm.on("touchUp", function () {
	button_confirm.bgColor = '3F51B5FF';
})


do_Page.on("back", function () {
	do_App.closePage({
		animationType: 'push_l2r'
	});
})
icon_back.on('touch', function () {
	do_App.closePage({
		animationType: 'push_l2r'
	});
})