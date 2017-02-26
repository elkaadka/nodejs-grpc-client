/*
This is a basic example showing how a grpc client works with nodejs
To have a full server-client experience, install and run the nodejs server here: https://github.com/elkaadka/nodejs-grpc-server
In this example, we use a Product class defined in product.proto (also used in the server part)
*/


var productProto = __dirname + '/product.proto';
var grpc = require('grpc');
//here we ask grpc to laod the file that has the package name : "Product" (see product.proto)
var product = grpc.load(productProto).Product;

//The calculator function , when invocked, will connect to a server that is running locally (port 3000) to exceute the function there
var client = new product.Calculator('localhost:3000', grpc.credentials.createInsecure());

//We dfined a product, a cookie box that costs 1,27 and a quantity of 3
var productExample = {
    name: "Cookies",
    quantity: 3,
    unitPrice: {
        price: 1.27
    }
};

console.log(productExample);
//We then ask te server to calculate the total price:
client.calculatePrice(productExample, function(err, response) {
    process.stdout.write('Total price is :')
    console.log(response);
});
