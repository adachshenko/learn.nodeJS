const models = require("./models");
const config = require("./config/config");

let product = new  models.product.Product();
let user = new models.user.User();

console.log(config.applicationName);