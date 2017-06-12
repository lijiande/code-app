var d = require("deviceone");

module.exports.init = init;
module.exports.security = security;

var app = d.sm("do_App");
var page = d.sm("do_Page");
var do_Global = d.sm("do_Global");
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

function security(){
	do_Global.on('background',function(){
		do_Global.exit();
	})
}