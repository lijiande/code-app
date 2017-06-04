/**
 * 
 */

var dataSource = require("util/dataSource");
var constants = require("config/constants");
var nf = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_index_dataList = ui("do_IndexListView_dataList");
var hashData = mm("do_HashData");
var do_DataCache = sm("do_DataCache");
var cacher = sm("do_DataCache");
var icon_add = ui("do_IconFont_add");

function flushPage(){
	hashData.removeAll();
	hashData.addData(do_DataCache.loadData('listSource'));
	do_index_dataList.bindItems(hashData,constants.conMap().indexCharArray);
	do_index_dataList.refreshData();
}

/**
 * 监控上层关闭事件
 */
do_Page.on("result",function(data){
	if(data.type === 1){
		flushPage();
	}
})


/**
 * 单元绑定事件
 */
do_index_dataList.on("touch",function(data){
	var groupId = data.groupID;
	var index = data.index;
	var datas = hashData.getAll();
	var id = datas[groupId][index].id;
	do_App.openPage({
		source:"source://view/detail/detail.ui",
		data:{'type':0,'data':id},
		statusBarState:"show",
		animationType: "fade"
	});
});


/**
 * 新增按钮
 */
icon_add.on("touch",function(){
	do_App.openPage({
		source:"source://view/addPage/addPage.ui",
		statusBarState:"show",
		animationType: "fade"
	});
});
do_Page.on('loaded',function(){
	flushPage();
})