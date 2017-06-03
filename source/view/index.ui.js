/**
 * @Author : lijian
 * @Timestamp : 2017-05-07
 */
var common = require("util/common");
var dataSource = require("util/dataSource");


var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_ViewShower_main = ui("do_ViewShower_main");
var alayout1 = ui("do_ALayout_1");
var alayout2 = ui("do_ALayout_2");
var title = ui("do_Label_title");
var icon_top = ui("do_IconFont_top");


icon_top.iconName = "code";
icon_top.iconCode = "e651";
// 退出到开发页面
do_Page.on("back", function(data) {
	do_App.closePage("","",2);
//	do_Global.exit();
})

// 页面列表
var viewShower_data = [
                       {
                    	   "id":"more",
                    	   "path":"source://view/more/more.ui"
                       },
                       {
                    	   "id":"dataList",
                    	   "path":"source://view/dataList/dataList.ui"
                       }];
do_ViewShower_main.addViews(viewShower_data);
do_ViewShower_main.showView("dataList","fade");

alayout1.on("touch",function(){
	do_ViewShower_main.showView("dataList", "fade");
	title.text = "列 表";
});
alayout2.on("touch",function(){
	do_ViewShower_main.showView("more", "fade");
	title.text = "更 多";
});
//button_add.on("touch",function(){
//	do_App.openPage({
//		source:"source://view/addPage/addPage.ui",
//		statusBarState:"show",
//		animationType: "fade"
//	});
//});

common.page.on("loaded",function(){
});



//退出按钮
//var nf = sm("do_Notification");
//var canBack = false;
//var delay3 = mm("do_Timer");
//delay3.delay = 3000;
//delay3.on("tick",function(){
//	delay3.stop();
//	canBack = false;
//})
//do_Page.on("back",function(){
//	if(canBack) {
//		do_Global.exit();
//	} else {
//		do_Notification.toast("再次点击退出应用");
//		canBack = true;
//		delay3.start();
//	}
//})


