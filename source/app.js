/**
 * @Author : lijian
 * @Timestamp : 2017-05-07
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage({
			source:"source://view/login.ui",
			statusBarState: "transparent",
			animationType: "fade"
	});
	
});
