const playVideo = require ('./playVideo');
// const Peer = require("simple-peer");
const $ =require('jquery');

function openCamera(cb){
  navigator.mediaDevices.getUserMedia({ audio:true, video:true})
  .then(stream => {
    cb(stream);
    })
  .catch(err => console.log(err));
} 

module.exports = openCamera;
