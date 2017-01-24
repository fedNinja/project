var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parserJson = bodyParser.json();
var Properties = require('./models/properties');
var Images = require('./models/images');
const {PORT, DATABASE_URL} = require('./config');
// img path
var imgPath = './public/images/image1.png';
console.log(imgPath);
var app = express();
app.use(express.static('public'));
var newImg = new Images();
newImg.img.data = fs.readFileSync(imgPath);
newImg.img.contentType = 'image/png';
newImg.save();
console.log(newImg);

app.post('/list-properties', parserJson, function(request,response){
console.log(request.body);
Properties.create({
	name:request.body.name,
	address:request.body.address,
	capacity:request.body.capacity,
  img_property:newImg
},function(error,result){
	if(error){
		return response.status(500).json({message:'server error'});
	}
	response.status(201).json(result);
});

});

//app.listen(process.env.PORT || 8080);
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// `closeServer` function is here in original code

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
exports.app = app;