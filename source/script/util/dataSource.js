var d = require("deviceone");
var common = require("util/common");
var sqlState = require("config/dataSourceConfig");
var dataTool = require("util/dataTool");
module.exports.initData = initCodeTable;
module.exports.save = save;

var main_data = d.mm("do_SQLite", "main");
var do_Storage = d.sm("do_Storage");
main_data.open("data://code_main.db");


function initCodeTable() {
	d.print("start init method", "initCodeTable");
	if (checkTable("code")) {
		return true;
	}
	var sql = sqlState.sqlMap().createCodeTable.sql;

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
	var sql = sqlState.sqlMap().checkTable.sql;
	var result = main_data.querySync(sql, [tableName])[0].num == 1 ? true : false;
	d.print(result, "checkTable");
	return result;
}

/**
 * 新增数据
 * @param saveArray 0-name,1-key,2-value,3-remark
 * @returns
 */
function save(saveArray) {
	if (!saveArray instanceof Array) {
		d.print("检查参数", "saveData")
		return false
	}
	var sqlMap = sqlState.sqlMap().insert;
	//id,name,name_index,key_word,value_word,star,remark,sign
	var array = [];
	array.push(dataTool.getUUID());
	array.push(saveArray[0]);
	array.push("A");
	array.push(saveArray[1]);
	array.push(saveArray[2]);
	array.push("1");
	array.push(saveArray[3]);
	array.push(dataTool.getUUID());
	if (array.length != sqlMap.num) {
		d.print("检查参数", "saveData")
		return false
	}
	d.print(array,"插入的数组");
	var result = main_data.executeSync(sqlMap.sql, array);
	d.print(result,"insert")
	common.toast("保存成功")
	return result; 
}