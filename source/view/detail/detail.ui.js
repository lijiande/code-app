/*这是新增数据的页面*/

/*自订工具*/
var dataTool = require("util/dataTool");
var common = require("util/common");
var dataSource = require("util/dataSource");

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");

/*数据区*/
var text_name =  ui("do_TextField_name");
var text_key = ui("do_TextField_keyWord");
var text_value = ui("do_TextField_valueWord");
var text_remark = ui("do_TextBox_remark");
var text_modify_time = ui("do_TextField_modi_time");
var text_create_time = ui("do_TextField_create_time");

var canvas_name = ui("do_Canvas_name");
var canvas_key = ui("do_Canvas_key");
var canvas_value = ui("do_Canvas_value");
var canvas_modi_time = ui("do_Canvas_modi_time");
var canvas_create_time = ui("do_Canvas_create_time");

var icon_visible = ui("do_IconFont_visible");
var icon_back = ui("do_IconFont_back");
var icon_edit = ui("do_IconFont_edit");
var save_flage = false;	//定义保存按钮是否已按，避免重复提交，ture-按了，false-没按
var id =  do_Page.getData().data;
var detail = {};
var update_flage = false;
/**
 * 初始化数据
 */
initData();

function initData(){
	detail = dataSource.getDetail(id)[0];
	text_name.text = detail.name;
	text_key.text = detail.key;
	text_value.text = detail.value;
	text_remark.text = detail.remark;
	text_modify_time.text = detail.modifyTime;
	text_create_time.text = detail.createTime;
}





/**
 * 绘制下划线
 */
canvas_name.defineLine({x:1,y:0},{x:449,y:0});
canvas_key.defineLine({x:1,y:0},{x:449,y:0});
canvas_value.defineLine({x:1,y:0},{x:449,y:0});
canvas_modi_time.defineLine({x:1,y:0},{x:449,y:0});
canvas_create_time.defineLine({x:1,y:0},{x:449,y:0});

// 监控编辑按钮
icon_edit.on("touch",function(){
	do_App.openPage({
		source:"source://view/addPage/addPage.ui",
		data:{'type':1,'data':detail},
		statusBarState:"show",
		animationType: "fade"
	});	
})



/**
 * 定义返回键
 */
do_Page.on("back", function(data) {
	var num = update_flage?1:0;
	do_App.closePage({type:num});
})
icon_back.on("touch",function(){
	var num = update_flage?1:0;
	do_App.closePage({type:num});
})

/**
 * 密码可见性icon
 */
icon_visible.on("touch",function(){
	text_value.password = text_value.password?false:true;
	if(text_value.password){
		icon_visible.iconCode = 'e6e5';
	}else{
		icon_visible.iconCode = 'e6e4';
	}
})

do_Page.on('result',function(data){
	if(data.type === 1){
		update_flage = true;
		initData();
	}
})
