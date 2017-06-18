/**
 * 
 */

var codeRep = require("repository/code");
var constants = require("config/constants");
var pageUi = require("ui");
var common = require("util/common");
pageUi.security();

var nf = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_index_dataList = ui("do_IndexListView_dataList");
var alayout_search = ui('do_ALayout_search');
var alayout_add = ui('do_ALayout_add');

var search_text = ui('do_TextField_search');

var icon_add = ui("do_IconFont_add");
var icon_search = ui("do_IconFont_search");

var hashData = mm("do_HashData");

alayout_search.visible = false;

function flushPage() {
	hashData = codeRep.getDataListHash();
	do_index_dataList.bindItems(hashData, codeRep.getDataIndexList());
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
	alayout_search.visible = false;
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
		animationType: "push_r2l",
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
		animationType: "push_r2l",
		statusBarFgColor: "black" // 修改缺省的状态栏字体颜色，只有white，black二种，这个属性只支持ios
	});
});
do_Page.on('loaded', function () {
	flushPage();
})

icon_search.on('touch', function () {
	alayout_search.visible = alayout_search.visible === true ? false : true;
})

search_text.on('enter', function () {
	var data = codeRep.searchCode(search_text.text);
	hashData = data.hashData;
	do_index_dataList.bindItems(hashData, codeRep.getDataIndexList());
	do_index_dataList.refreshData();
	common.toast('搜到' + data.num + '条数据');
})

do_Page.on('pause', function () {
	alayout_search.visible = false;
})