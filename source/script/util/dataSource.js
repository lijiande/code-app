var d = require("deviceone");
var common = require("util/common");
var sqlState = require("config/dataSourceConfig");
var dataTool = require("util/dataTool");
var do_DataCach = d.sm("do_DataCache");

/**
 * 对外接口
 */
module.exports.initCodeTable = initCodeTable;
module.exports.save = save;
module.exports.initDataList = initDataList;
module.exports.getDetail = getDetail;
module.exports.flushDataList = flushDataList;
module.exports.update = update;


var main_data = d.mm("do_SQLite", "main");
var do_Storage = d.sm("do_Storage");
main_data.open("data://code_main.db");

/**
 * 在第一次使用时初始化表格
 * @returns
 */
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
		return false;
	}
	var sqlMap = sqlState.sqlMap().insert;
	//id,name,name_index,key_word,value_word,star,remark,sign
	var array = [];
	array.push(dataTool.getUUID());
	array.push(saveArray[0]);
	var char = saveArray[0].charAt(0);
	var reg = new RegExp('^[a-zA-Z]$');
	if(reg.test(char)){
		char = char.toUpperCase();
	}else{
		char = '#';
	}
	array.push(char);
	array.push(saveArray[1]);
	array.push(saveArray[2]);
	array.push("1");
	array.push(saveArray[3]);
	array.push(dataTool.getUUID());
	if (array.length != sqlMap.num) {
		d.print("检查参数", "saveData")
		return false
	}
	var result = main_data.executeSync(sqlMap.sql, array);
	d.print(result,"insert")
	flushDataList();
	return result; 
}

/**
 * 
 * @param saveArray 0-name,1-key,2-value,3-remark,4-id
 * @param updateArray
 * @returns
 */
function update(updateArray){
	if (!updateArray instanceof Array) {
		d.print("检查参数1", "updateData")
		return false;
	}
	var sqlMap = sqlState.sqlMap().update;
	//name,name_index,key_word,value_word,modify_time,star,remark,sign,id
	var array = [];
	array.push(updateArray[0]);
	var char = updateArray[0].charAt(0);
	var reg = new RegExp('^[a-zA-Z]$');
	if(reg.test(char)){
		char = char.toUpperCase();
	}else{
		char = '#';
	}
	array.push(char);
	//key
	array.push(updateArray[1]);
	array.push(updateArray[2]);
	array.push('1');
	array.push(updateArray[3]);
	array.push(dataTool.getUUID());
	array.push(updateArray[4]);
	if (array.length != sqlMap.num) {
		d.print("检查参数2", "updateData")
		return false
	}
	var result = main_data.executeSync(sqlMap.sql, array);
	d.print(result,"insert")
	flushDataList();
	return result; 
}
/**
 * 查看详情
 * @param id
 * @returns
 */
function getDetail(id){
	var result = main_data.querySync(sqlState.sqlMap().selectOne.sql, [id]);
	return result;
}
/**
 * 初始化dataList
 * @returns
 */
function initDataList(){
	var bol = do_DataCach.hasData('listSource');
	if(bol){
		return;
	}
	common.toast("正在初始化缓存");
	var dataObj = {};
	var array = main_data.querySync(sqlState.sqlMap().selectParam.sql)
	if(array.length === 0){
		array = {};
	}else{
		dataObj = dataTool.generateDataList(array);
	}
	
	var result = do_DataCach.saveData('listSource', dataObj);
	return result;
}
/**
 * 手动刷新dataList缓存
 * @returns
 */
function flushDataList(){
	var array = main_data.querySync(sqlState.sqlMap().selectParam.sql)
	var dataObj = dataTool.generateDataList(array);
	var result = do_DataCach.saveData('listSource', dataObj);
	return result;
}