module.exports.getMap = function () {
	return sqlStatement;
};



var checkTable = "SELECT COUNT(*) AS num FROM sqlite_master WHERE type='table' AND name= ?";
var createCodeTable = "CREATE TABLE IF NOT EXISTS code " +
	"(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"user_id,name, name_index, key_word, value_word, " +
	"create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), " +
	"modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), " +
	"star, " +
	"remark, " +
	"sign)";

var insert = "INSERT INTO code(id,name,name_index,key_word,value_word,star,remark,sign)VALUES (?,?,?,?,?,?,?,?)";
var update = "UPDATE code SET name=?,name_index=?,key_word=?,value_word=?,star=?,remark=?,sign=? WHERE id=?";
var del = "DELETE FROM code where id = ?";
var selectOne = "SELECT * FROM code WHERE id = ?";
var selectParam = "SELECT id,name,name_index FROM code ORDER BY name_index";
var syncSelect = "SELECT id,user_id as userId,name,name_index as nameIndex,key_word as keyWord," +
	"value_word as valueWord,create_time as createTime,modify_time as modifyTime,star,remark,sign FROM code";
var sqlStatement = {
	checkTable: checkTable,
	createCodeTable: createCodeTable,
	insert: insert,
	update: update,
	del: del,
	selectOne: selectOne,
	selectParam: selectParam,
	syncSelect: syncSelect
};