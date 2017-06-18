var d = require("deviceone");
var do_Page = d.sm("do_Page");
var do_Notification = d.sm("do_Notification");
module.exports.toast = alertToast;
module.exports.page = do_Page;
// 弹出消息
function alertToast(str) {
	do_Notification.toast(str, -1, 500);
}