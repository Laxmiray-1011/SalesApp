const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    productName: String,
    quantity: Number,
    amount: Number
},{ timestamps: true });

module.exports = mongoose.model('AddSales', salesSchema);
