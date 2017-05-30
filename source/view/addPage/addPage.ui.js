/**
 * 这是新增数据的页面
 */
var dataTool = require("util/dataTool");
var common = require("util/common");
var dataSource = require("util/dataSource");

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var button_save = ui("do_Button_save");
var button_visual = ui("do_Button_visual");
var text_name =  ui("do_TextField_name");
var text_key = ui("do_TextField_keyWord");
var text_value = ui("do_TextField_valueWord");
var text_remark = ui("do_TextBox_remark");
var scroll = ui("do_ScrollView_1");
do_Page.on("back", function(data) {
	do_App.closePage();
})

button_save.on("touch",function(){
	var message = dataTool.encodeKey("1");
	var data = [];
	data.push(text_name.text);
	data.push(text_key.text);
	data.push(text_value.text);
	data.push(text_remark.text);
	dataSource.save(data);
	common.toast(data);
});

button_visual.on("touch",function(){
	text_value.password = text_value.password?false:true;
});
text_remark.on("focusIn",function(data){
//	scroll.height = scroll.height-data.keybordHeight;
})