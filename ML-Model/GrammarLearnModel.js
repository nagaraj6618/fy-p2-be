const mongoose = require("mongoose");

const learnGrammarSchema = new mongoose.Schema({
   request:{
      type:String, 
   },
   response:{
      title:String,
      notes:String,
      examples:[
         {
            sentence:String,
            explanation:String,
         }
      ],
      quiz:[
         {
            question:String,
            options:Array,
            answer:String
         }
      ]

   },
   userId:String
},{timestamps:true});

const LearnModel = mongoose.model('learn-grammar',learnGrammarSchema);

module.exports = LearnModel;