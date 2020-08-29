var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var arryUser=[];

io.on("connection", function(socket){
    socket.on("dangky",function(data){
        if (arryUser.indexOf(data)>=0){
            socket.emit("dk_that_bai");
        } else {
            arryUser.push(data);
            socket.Username=data;
            socket.emit("dk_thanh_cong",data);
            io.sockets.emit("danh_sach_user",arryUser);
        }
    })
    socket.on("dangxuat",function(data){
        arryUser.splice(arryUser.indexOf(data),1);
        socket.broadcast.emit("danh_sach_user",arryUser);
    })
    socket.on("message",function(data){
        io.sockets.emit("message_all",{us:socket.Username, nd:data});
    })
    socket.on("dang_text",function(){
        socket.broadcast.emit("user_dang_text",socket.Username);
    })
    socket.on("ngung_text",function(){
        socket.broadcast.emit("user_ngung_text",socket.Username);
    })
});


app.get("/",function(req,res){
    res.render("trangchu");
});

