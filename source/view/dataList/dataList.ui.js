/**
 * 
 */

var dataSource = require("util/dataSource");
var nf = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var dataList = ui("do_IndexListView_dataList");
var hashData = mm("do_HashData");
var cacher = sm("do_DataCache");
//var listview = ui("do_ListView_1");

var listdata = mm("do_ListData");
hashData.addData({'A':[{'template':0,'title':'a1',"id":"1"},{'template':1,'title':'a2',"id":"1"}],'B':[{'template':0,'title':'b1',"id":"1"},{'template':1,'title':'b2',"id":"1"}]});

dataList.bindItems(hashData,["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"]);
dataList.refreshData();
dataSource.getDataList();