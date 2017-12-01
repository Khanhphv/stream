const io = require('socket.io')(3000);

const arrUserInfo =[];

io.on('connection',socket =>{
    socket.on("NGUOI_DUNG_DANG_KY", user =>{
        const isExist = arrUserInfo.some(e => e.ten == user.ten)
        if(isExist){
            return socket.emit("DANG_KY_THAT_BAI");
        }
        arrUserInfo.push(user);
        socket.emit("DANH_SACH_ONLINE", arrUserInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI',user);
    })
});