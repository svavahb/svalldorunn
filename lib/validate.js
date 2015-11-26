'use strict';

var validate = { };

validate.isEmail = function (email) {
  var rex = /\S+@\S+\.\S+/;
  return rex.test(email);
};

validate.isImage = function (image) {
  var rex = /(.*(.jpg|.jpeg|.gif|.png|.tiff|.bmp).*)|()/;
  return rex.test(image);
};

validate.required = function (s) {
  if(s){
    return true;
  }
  return false;
};

validate.length1 = function (s,n) {
  if(s.length < n){
    return false;
  }
  return true;
};

module.exports = validate;
