
const openCamera = require('./openCamera');
const $ = require('jquery');
const Peer =require('peerjs');
const playStream = require('./playVideo');
const uid = require ('uid')

const config= {host: 'kkksstream.herokuapp.com', port:443, secure: true , key:'peerjs' };

function getPeer(){
    const id= uid(10);
    $('#peer-id').append(id);
    return id;
}

const peer = Peer(getPeer(), config);



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