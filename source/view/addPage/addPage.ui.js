/*这是新增数据的页面*/

/*自订工具*/
var dataTool = require("util/dataTool");
var common = require("util/common");
var dataSource = require("repository/code");
var pageUi = require("ui");
pageUi.security();

var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");

var label_title = ui("do_Label_title");
var text_name = ui("do_TextField_name");
var text_key = ui("do_TextField_keyWord");
var text_value = ui("do_TextField_valueWord");
var text_remark = ui("do_TextBox_remark");

var canvas_name = ui("do_Canvas_name");
var canvas_key = ui("do_Canvas_key");
var canvas_value = ui("do_Canvas_value");

var icon_visible = ui("do_IconFont_visible");
var icon_back = ui("do_IconFont_back");
var icon_save = ui("do_IconFont_save");
var save_flage = false; //定义保存按钮是否已按，避免重复提交，ture-按了，false-没按
var back_flage = false;
var pageType = 0; //0-新增，1-修改
var updataParam = {};
/**
 * 绘制下划线
 */
canvas_name.defineLine({
	x: 1,
	y: 0
}, {
	x: 449,
	y: 0
});
canvas_key.defineLine({
	x: 1,
	y: 0
}, {
	x: 449,
	y: 0
});
canvas_value.defineLine({
	x: 1,
	y: 0
}, {
	x: 449,
	y: 0
});
/**
 * 0-新增，1-修改
 */
var pageData = do_Page.getData();
if (pageData.type === 1) {
	label_title.text = '修 改';
	text_name.text = pageData.data.name;
	text_key.text = pageData.data.key;
	text_value.text = pageData.data.value;
	text_remark.text = pageData.data.remark;
	updataParam.id = pageData.data.id;
	back_flage = false;
	pageType = 1;
}

/**
 * 监控输入框是否被改变
 */
text_name.on('textChanged', function () {
	back_flage = true;
})
text_key.on('textChanged', function () {
	back_flage = true;
})
text_value.on('textChanged', function () {
	back_flage = true;
})
text_remark.on('textChanged', function () {
	back_flage = true;
})



/**
 * 新增保存方法
 * @returns
 */
function saveNew(data) {
	var result = dataSource.insertNew(data);
	if (result) {
		do_Notification.toast("保存成功");
		do_App.closePage({
			data: {
				type: 1
			},
			animationType: "push_l2r"
		})
	} else {
		do_Notification.alert("保存失败", '系统异常', '是', function (data, e) {});
		save_flage = false;
	}
}
/**
 * 修改更新方法
 * @param data
 * @returns
 */
function update(data) {
	var result = dataSource.update(data);
	if (result) {
		do_Notification.toast("保存成功");
		do_App.closePage({
			data: {
				type: 1
			},
			animationType: "push_l2r"
		})
	} else {
		do_Notification.alert("保存失败", '系统异常', '是', function (data, e) {});
		save_flage = false;
	}
}

/**
 * 定义返回键
 */
do_Page.on("back", function (data) {
	if (!back_flage) {
		do_App.closePage();
		return;
	}
	do_Notification.confirm('未保存，确认退出吗', '提示', '否', '是', function (data, e) {
		if (data === 2) {
			do_App.closePage({
				animationType: "push_l2r"
			});
		}
	})
})
icon_back.on("touch", function () {
	if (!back_flage) {
		do_App.closePage({
			animationType: "push_l2r"
		});
		return;
	}
	do_Notification.confirm('未保存，确认退出吗', '提示', '否', '是', function (data, e) {
		if (data === 2) {
			do_App.closePage({
				animationType: "push_l2r"
			});
		}
	})
})

/**
 * 密码可见性icon
 */
icon_visible.on("touch", function () {
	text_value.password = text_value.password ? false : true;
	if (text_value.password) {
		icon_visible.iconCode = 'e6e5';
	} else {
		icon_visible.iconCode = 'e6e4';
	}
})

/**
 * 保存方法
 */
icon_save.on("touch", function () {
	if (save_flage) {
		do_Notification.toast('不能重复提交');
		return;
	}
	save_flage = true;

	var data = {};
	data.name = text_name.text;
	data.keyWord = text_key.text;
	data.valueWord = text_value.text;
	data.remark = text_remark.text;
	var temp = [data.name, data.keyWord, data.valueWord];
	var value_flage = true;
	temp.forEach(function (value, key, map) {
		if (!value) {
			value_flage = false;
		}
	})
	if (!value_flage) {
		save_flage = false;
		do_Notification.toast('数据不完整');
		return;
	}
	if (pageType === 0) {
		saveNew(data);
	} else if (pageType === 1) {
		data.id = updataParam.id;
		update(data);
	} else {
		do_Notification.alert('参数错误', '系统异常', '是', function (data, e) {})
	}
});