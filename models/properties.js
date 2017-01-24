var mongoose = require('mongoose');
//var Reservation = require('./reservations');
//var Review = require('./review');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
 name:{type:String,require:true},
 address:{type:String,require:true},
 capacity:{type:Number,require:true},
 amenities:{type:String, require:false},
 //img_property:[{data: Buffer, contentType: String}],
 img_property:[{type:mongoose.Schema.Types.ObjectId, ref: 'Image'}],
 rate:{type:Number, require:true},
 available_date_from:{type:Date, default:Date.now},
 available_date_to:{type:Date, default:Date.now},
 available_time_from:{type:Date, default:Date.now},
 available_time_to:{type:Date, default:Date.now},
 owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 reservations:[{type:mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
 reviews:[{type:mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

var Property = mongoose.model('Property',PropertySchema);
module.exports = Property;