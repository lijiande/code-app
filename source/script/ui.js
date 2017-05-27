var d = require("deviceone");
// 声明

module.exports.init = init;

var app = d.sm("do_App");
var page = d.sm("do_Page");

function init(ui_id) {
	if(ui_id){
		var close = d.ui(ui_id);
		close.on("touch", function() {
			app.closePage();
		})
	}
	page.on("back", function(data) {
		app.closePage();
	})
	var main = d.ui("$");
	main.on("touch", function() {
		page.hideKeyboard();
	})
}