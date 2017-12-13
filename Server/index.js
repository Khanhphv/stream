const io = require('socket.io')(3000);

const arrUserInfo =[];

io.on('connection',socket =>{
    socket.on("NGUOI_DUNG_DANG_KY", user =>{
        const isExist = arrUserInfo.some(e => e.ten == user.ten);
        socket.peerID = user.peerID;
        if(isExist){
            return socket.emit("DANG_KY_THAT_BAI");
        }
        arrUserInfo.push(user);
        socket.ten = user.ten;
        socket.emit("DANH_SACH_ONLINE", arrUserInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI',user);
        console.log(user);
    })
    socket.on('disconnect', () =>{
        const index = arrUserInfo.findIndex(user=> user.peerID === socket.peerID);
        console.log(socket.peerID);
        arrUserInfo.splice(index,1);
        io.emit('AI_DO_NGAT_KET_NOI',socket.peerID);
        //console.log(socket.peerId);
    });
    socket.on('user-send-message',function(data){
        console.log(socket.ten);
        io.sockets.emit("server-send-message",{un:socket.ten,nd:data});
       
    }); 

});