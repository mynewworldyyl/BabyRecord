var exec = require('cordova/exec');

exports.fileInfo = function (filePath, success, error) {
    exec(success, error, 'AlbumPlugin', 'fileInfo', [filePath]);
};

exports.deleteFile = function (filePath, success, error) {
  exec(success, error, 'AlbumPlugin', 'deleteFile', [filePath]);
};

exports.queryFileList = function (albumId,offset,limit,year,month, success, error) {
  exec(success, error, 'AlbumPlugin', 'queryFileList', [albumId,offset,limit,year,month]);
};

exports.encrypt = function (str, success, error) {
  exec(success, error, 'AlbumPlugin', 'encrypt', [str]);
};

exports.decrypt = function (str, success, error) {
  exec(success, error, 'AlbumPlugin', 'decrypt', [str]);
};


