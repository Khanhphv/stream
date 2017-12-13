
const openCamera = require('./openCamera');
const $ = require('jquery');
const Peer =require('peerjs');
const playStream = require('./playVideo');
const uid = require ('uid')
const socket = io('http://localhost:3000');
//const config= {host: 'kkksstream.herokuapp.com', port:443, secure: true , key:'peerjs' };

$("#div-chat").hide();


socket.on("DANH_SACH_ONLINE", arrUserInfor =>{
        $("#div-chat").show();
        $("#div-dang-ki").hide();
        arrUserInfor.forEach(user => {
                const {ten ,peerID} =user;
                $('#ulUser').append(`<li id="${peerID}">${ten}</li>`);
        });
        socket.on('CO_NGUOI_DUNG_MOI', user => {
                const { ten, peerID } = user;
                $("#ulUser").append(`<li id="${peerID}">${ten}</li>`);
        });

        socket.on('AI_DO_NGAT_KET_NOI', peerID => {
                //console.log(peerID);
                $(`#${peerID}`).remove();
        });
       
});
socket.on("DANG_KY_THAT_BAI",() => alert("DKY THAT BAI"));
/* function getPeer(){
    const id= uid(10);
    $('#peer-id').append(id);
    return id;
} */

//const peer = Peer(getPeer(), config);
var peer = new Peer({ key: '0368xkourz4cxr' });

peer.on('open', id =>{
        $('#my-peer').append(id);
        $("#btnSignUp").click(() => {
                        const username = $('#txtUsername').val();
                        socket.emit("NGUOI_DUNG_DANG_KY", {ten:username, peerID: id});
                });

});

$("#btnSendMessage").click(function () {
        const data = $('#txtMessage').val();
        console.log(data);
        socket.emit("user-send-message", data);
        $('#txtMessage').val("");
});

//Caller
$('#btnCall').click(() =>{
	const id = $('#remoteId').val();
	openCamera(stream =>{
        playStream(stream, 'localStream');
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream(remoteStream,'remoteStream'));
	});
});


//Callee

peer.on('call',call => {
	openCamera(stream =>{
        call.answer(stream);
        playStream( stream,'localStream');
        call.on('stream', remoteStream=> playStream( remoteStream,'remoteStream'));
	});
});
 $('#ulUser').on('click', 'li', function() {
        const id =$(this).attr('id'); 
         openCamera(stream => {
                 playStream(stream, 'localStream');
                 const call = peer.call(id, stream);
                 call.on('stream', remoteStream => playStream(remoteStream, 'remoteStream'));
         });
})
socket.on('server-send-message', function (data) {
        $("#listMessages").append("<div class='ms'>" + data.un + " : " + data.nd + "</div>");
});
