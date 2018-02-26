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
var valueNumParam = [47, 70, 76, 2, 65, 18, 91, 26, 57, 100, 40, 28, 82, 62, 73, 20, 97, 65, 31, 48, 20, 52, 29, 46, 32, 12, 9, 89, 34, 72, 5, 22, 90, 73, 16, 7, 88, 82, 22, 94, 90, 49, 5, 17, 10, 26, 76, 32, 97, 84, 21, 87, 60, 46, 84, 81, 87, 37, 77, 98];

var valueNumParam2 = [86, 53, 56, 50, 68, 54, 83, 65, 76, 60, 89, 49, 57, 89, 72, 65, 71, 63, 70, 81, 83, 79, 68, 53, 74, 53, 54, 78, 75, 51];

// var valueNumParam3 = [3, 1, 2, 2, 2, 3, 2, 2, 1, 3, 1, 3, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2];
var valueNumParam3 = [25, 24, 28, 4, 17, 26, 18, 7, 26, 14, 21, 14, 9, 27, 14, 5, 3, 13, 18, 20, 3, 10, 2, 18, 28, 4, 19, 15, 7, 5];
var dataMap = {
	indexCharArray: indexCharArray,
	newSign: newSign,
	updateSign: updateSign,
	dataListName: dataListName,
	valueNumParam: valueNumParam,
	valueNumParam2: valueNumParam2,
	valueNumParam3: valueNumParam3
};