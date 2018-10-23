// Multiparty Middleware
const multipart = require("connect-multiparty");
exports.multipartMiddleware = multipart();

exports.isEmpty = function(str) {
  return !str || 0 === str.length;
}