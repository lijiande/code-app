/**
 * 这是新增数据的页面
 */
var dataTool = require("util/dataTool");
var common = require("util/common");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var button_save = ui("do_Button_save");
var button_visual = ui("do_Button_visual");
var text_name =  ui("do_TextField_1");
var text_key = ui("do_TextField_2");
var text_value = ui("do_TextField_3");
var text_remark = ui("do_TextBox_1");
var scroll = ui("do_ScrollView_1");
do_Page.on("back", function(data) {
	do_App.closePage();
})

button_save.on("touch",function(){
	var message = dataTool.encodeKey("1");
	common.toast(message);
});

button_visual.on("touch",function(){
	text_value.password = text_value.password?false:true;
});
text_remark.on("focusIn",function(data){
	scroll.height = scroll.height-data.keybordHeight;
})