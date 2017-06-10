module.exports.getSql = function () {
	return sqlMap
};



// 检查表是否存在
var checkTable = "SELECT COUNT(*) AS num FROM sqlite_master WHERE type='table' AND name= ?";

// 创建code表
var createCodeTable = "CREATE TABLE IF NOT EXISTS code " +
	"(id TEXT PRIMARY KEY, " +
	"user_id,name, name_index, key_word, value_word, " +
	"create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), " +
	"modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), " +
	"star, " +
	"remark, " +
	"sign)";

// 新增一条数据
var insert = "INSERT INTO code(id,name,name_index,key_word,value_word,star,remark,sign)VALUES (?,?,?,?,?,?,?,?)";

// 更新一条数据
var update = "UPDATE code SET name=?,name_index=?,key_word=?,value_word=?,modify_time=datetime('now','localtime'),star=?,remark=?,sign=? WHERE id=?";

// 删除一条数据
var del = "DELETE FROM code where id = ?";

// 获取一条数据
var selectOne = "SELECT id,name as name,key_word as key,value_word as value,create_time as createTime,modify_time as modifyTime,remark as remark FROM code WHERE id = ?";

// 获取一条数据的主要参数
var selectParam = "SELECT id,name,name_index FROM code ORDER BY name_index";

// 同步sql
var syncSelect = "SELECT id,user_id as userId,name,name_index as nameIndex,key_word as keyWord," +
	"value_word as valueWord,create_time as createTime,modify_time as modifyTime,star,remark,sign FROM code";

var dropTable = 'DROP TABLE code';
var sqlMap = {
	createCodeTable: {
		sql: createCodeTable,
		num: 0
	},
	checkTable: {
		sql: checkTable,
		num: 1
	},
	insert: {
		sql: insert,
		num: 8
	},
	update: {
		sql: update,
		num: 8
	},
	delete: {
		sql: del,
		num: 1
	},
	selectOne: {
		sql: selectOne,
		num: 1
	},
	selectParam: {
		sql: selectParam,
		num: 0
	},
	syncSelect: {
		sql: syncSelect,
		num: 0
	},
	dropTable: {
		sql: dropTable,
		num: 0
	}
};