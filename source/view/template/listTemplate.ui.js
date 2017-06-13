var root = ui("$");
var canvas_line = ui("do_Canvas_line");
canvas_line.defineLine({
	x: 40,
	y: 19
}, {
	x: 680,
	y: 19
});
root.setMapping({
	"do_Label_title.text": "name",
	"do_Label_id.text": "id"
})