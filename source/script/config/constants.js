/**
 * 系统级参数表
 */
module.exports.getCon = function () {
	return dataMap;
};

// listView 的index
var indexCharArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
// 新增数据的签名
var newSign = '123456';
// 修改数据的签名
var updateSign = '456123';
// listView保存在缓存中的名字
var dataListName = 'listSource';

// valueNum
var valueNumParam = [0, 100];

var valueNumParam2 = [49, 89];

var valueNumParam3 = [0, 30];
var dataMap = {
	indexCharArray: indexCharArray,
	newSign: newSign,
	updateSign: updateSign,
	dataListName: dataListName,
	valueNumParam: valueNumParam,
	valueNumParam2: valueNumParam2,
	valueNumParam3: valueNumParam3
};