/**
 * 
 */

var nf = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var dataList = ui("do_IndexListView_dataList");
var hashData = mm("do_HashData");
var cacher = sm("do_DataCache");
//var listview = ui("do_ListView_1");

var listdata = mm("do_ListData");
hashData.addData({'A':[{'template':0,'title':'a1',"id":"1"},{'template':0,'title':'a2',"id":"1"}],'B':[{'template':0,'title':'b1',"id":"1"},{'template':0,'title':'b2',"id":"1"}]});

dataList.bindItems(hashData,["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"]);
dataList.refreshData();

/**
 * indexListView
 * http://bbs.deviceone.net/forum.php?mod=viewthread&tid=133&highlight=indexlist
 */
var sqlite3 = mm("do_SQLite");
sqlite3.open("data://demo.db");
var sql0 = "CREATE TABLE IF NOT EXISTS code (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id, name, key_word, value_word, create_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), modify_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')), star, remark)";
var sql1 = "INSERT INTO code(id,user_id,name,key_word,value_word,create_time,modify_time,star,remark) VALUES('12', '1231231', '试试', 'key', 'value', datetime('2017-05-19 00:23:46'), datetime('2017-05-19 00:23:49'), '0', 'aa')";
//sqlite3.execute(sql0,function(data){
//	deviceone.print(data,"Create");
//	if(data){
//		deviceone.print("ok","Create");
//	}
//});
//var data = sqlite3.execute(sql1);
//deviceone.print(data,"Insert");
//if(data){
//	deviceone.print("ok","Insert");
//}