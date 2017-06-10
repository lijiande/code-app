var d = require("deviceone");
var common = require("util/common");
var codeSql = require("config/codeSql");
var constants = require('config/constants');
var dataTool = require("util/dataTool");
var do_DataCache = d.sm("do_DataCache");

// listView保存在缓存中的名字
var listName = constants.getCon().dataListName;

// 系统级
module.exports.initCodeTable = initCodeTable;
module.exports.flushDataList = flushDataList;
module.exports.initDataList = initDataList;

// 增删改查
module.exports.insertNew = insertNew;
module.exports.deleteCode = deleteCode;
module.exports.update = update;
module.exports.getDetail = getDetail;


// 给listIndexView提供数据
module.exports.getDataIndexList = getDataIndexList;
module.exports.getDataListHash = getDataListHash;




var do_Storage = d.sm("do_Storage");
var main_data = d.mm("do_SQLite", "main");
main_data.open("data://code_main.db");

/**
 * 初始化表格
 * @returns true-执行成功，false-执行失败
 */
function initCodeTable() {
	d.print("start init method", "initCodeTable");
	if (checkTable("code")) {
		return true;
	}
	var sql = codeSql.getSql().createCodeTable.sql;

	var result = main_data.executeSync(sql);
	if (result) {
		common.toast("初始化数据成功");
		return true;
	} else {
		common.toast("系统异常");
		return false;
	}
}
/**
 * 检查表是否存在
 * @param tableName
 * @returns true-存在，false-不存在
 */
function checkTable(tableName) {
	var sql = codeSql.getSql().checkTable.sql;
	var result = main_data.querySync(sql, [tableName])[0].num == 1 ? true : false;
	d.print(result, "checkTable");
	return result;
}

/**
 * 新增数据
 * @param saveArray 0-name,1-key,2-value,3-remark
 * @returns
 */

function insertNew(code) {
	var id = dataTool.getUUID();
	var name = code.name;
	var nameIndex = dataTool.getNameIndex(name);
	common.toast(name);
	var keyWord = code.keyWord;
	var valueWord = code.valueWord;
	var star = '1';
	var remark = code.remark;
	var sign = constants.getCon().newSign;

	// 数据存储顺序
	//id,name,name_index,key_word,value_word,star,remark,sign
	var paramArray = [id, name, nameIndex, keyWord, valueWord, star, remark, sign];
	var temp = [id, name, nameIndex, keyWord, valueWord, star, sign];
	// common.toast(paramArray);
	var flag = true;
	temp.forEach(function (x) {
		if (!x) {
			flag = false;
		}
	})
	if (flag) {
		var sql = codeSql.getSql().insert.sql;
		var result = main_data.executeSync(sql, paramArray);
		d.print(result, "insert")
		flushDataList();
		return result;
	} else {
		d.print("检查参数", "insertNew")
		return false
	}

}

/**
 * 
 * @param code 0-name,1-key,2-value,3-remark,4-id
 * @returns
 */
function update(code) {
	var id = code.id;
	var name = code.name;
	var nameIndex = dataTool.getNameIndex(name);
	var keyWord = code.keyWord;
	var valueWord = code.valueWord;
	var star = '1';
	var remark = code.remark;
	var sign = constants.getCon().updateSign;

	// 数据存储顺序
	//name,name_index,key_word,value_word,star,remark,sign,id
	var paramArray = [name, nameIndex, keyWord, valueWord, star, remark, sign, id];
	var temp = [name, nameIndex, keyWord, valueWord, star, sign, id];
	var flag = true;
	temp.forEach(function (x) {
		if (!x) {
			flag = false;
		}
	})
	if (flag) {
		var sql = codeSql.getSql().update.sql;
		var result = main_data.executeSync(sql, paramArray);
		d.print(result, "insert")
		flushDataList();
		return result;
	} else {
		d.print("检查参数", "update")
		return false
	}
}

/**
 * 查看详情
 * @param id
 * @returns
 */
function getDetail(id) {
	var result = main_data.querySync(codeSql.getSql().selectOne.sql, [id]);
	return result;
}
/**
 * 删除code
 * @param {*} id 
 * @return true-成功，false-失败
 */
function deleteCode(id) {
	var result = main_data.executeSync(codeSql.getSql().delete.sql, [id]);
	flushDataList();
	return result;
}
/**
 * 初始化dataList
 * @returns
 */
function initDataList() {
	var bol = do_DataCache.hasData(listName);
	if (bol) {
		return;
	}
	common.toast("正在初始化缓存");
	var dataObj = {};
	var array = main_data.querySync(codeSql.getSql().selectParam.sql)
	if (array.length === 0) {
		array = {};
	} else {
		dataObj = dataTool.generateDataList(array);
	}
	var result = do_DataCache.saveData(listName, dataObj);
	return;
}
/**
 * 手动刷新dataList缓存,提醒外围刷新
 * @returns
 */
function flushDataList() {
	var array = main_data.querySync(codeSql.getSql().selectParam.sql)
	var dataObj = dataTool.generateDataList(array);
	var result = do_DataCache.saveData('listSource', dataObj);
	return result;
}

/**
 * 获得dataList的index数组
 */
function getDataIndexList() {
	return constants.getCon().indexCharArray;
}
/**
 * 获得dataList的数据
 */
function getDataListHash() {
	var hashData = d.mm("do_HashData");
	if (do_DataCache.hasData(listName)) {
		hashData.addData(do_DataCache.loadData(listName));
	} else {
		hashData.addData({});
	}
	return hashData;
}