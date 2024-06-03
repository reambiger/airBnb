const mongoose = require("mongoose");

const dictionariesSchema = new mongoose.Schema({
   name:{type:String},
   type:{type:String}
  });
  
  const Dictionaries = mongoose.model('Dictionaries', dictionariesSchema)
  


module.exports =Dictionaries ;
