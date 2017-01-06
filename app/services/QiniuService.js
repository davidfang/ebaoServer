var qiniu = require('qiniu');
var uuid = require('uuid');
var config = require('../../config');

qiniu.conf.ACCESS_KEY = config.QiniuAK;
qiniu.conf.SECRET_KEY = config.QiniuSK;

module.exports.saveBase64 = function (descImage) {
    var bucket = 'ebaoavatar';
    var key = uuid.v4();
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    var token = putPolicy.token();

    var pic = descImage;
    var url = "http://upload.qiniu.com/putb64/-1";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState)
        if (xhr.readyState == 4){
            console.log('success', xhr.responseText);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + token);
    xhr.send(pic);
};