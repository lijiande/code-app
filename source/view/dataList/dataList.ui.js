/**
 * 
 */

var dataSource = require("repository/code");
var constants = require("config/constants");
var nf = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_index_dataList = ui("do_IndexListView_dataList");
var hashData = mm("do_HashData");
var icon_add = ui("do_IconFont_add");

function flushPage() {
	hashData = dataSource.getDataListHash();
	do_index_dataList.bindItems(hashData, dataSource.getDataIndexList());
	do_index_dataList.refreshData();
}

/**
 * 监控上层关闭事件,1-需要刷新数据
 */
do_Page.on("result", function (data) {
	if (data.type === 1) {
		flushPage();
	}
})


/**
 * 单元绑定事件
 */
do_index_dataList.on("touch", function (data) {
	var groupId = data.groupID;
	var index = data.index;
	var datas = hashData.getAll();
	var id = datas[groupId][index].id;
	do_App.openPage({
		source: "source://view/detail/detail.ui",
		data: {
			'type': 0,
			'data': id
		},
		statusBarState: "transparent",
		animationType: "fade",
		statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
	});
});


/**
 * 新增按钮
 */
icon_add.on("touch", function () {
	do_App.openPage({
		source: "source://view/addPage/addPage.ui",
		statusBarState: "show",
		animationType: "fade",
		statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
	});
});
do_Page.on('loaded', function () {
	flushPage();
})