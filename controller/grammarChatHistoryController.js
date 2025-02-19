const grammarChatHistoryModel = require("../model/chatHistoryModel");

const getAllGrammarChatHistory = async(req,res) => {

   try{
      const allChatHistoryData = await grammarChatHistoryModel.find();
      if(allChatHistoryData.length<=0){
         return res.status(404).json({
            success:false,
            message:"No chat history found..",
            data: allChatHistoryData
         })
      }
      return res.status(200).json({
         success:true,
         message:"Successfully retrived all chat history..",
         data:allChatHistoryData
      });
   }
   catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         error : error,
         success:false
      })
   }
}

const getGrammarChatHistoryById = async(req,res) => {

   try{
      const id = req.params.id || "";
      const chatHistoryData = await grammarChatHistoryModel.findById(id);
      if(!chatHistoryData){
         return res.status(404).json({
            message:"Requesting Chat history not found.",
            success:false
         });
      }
      return res.status(200).json({
         message:"Successfully Retrived the chat history",
         success:true,
         data : chatHistoryData
      });
   }
   catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         error : error,
         success:false
      })
   }
}

const createNewGrammarChatHistory = async(req,res) => {

   try{
      const newChatHistory = new grammarChatHistoryModel({
         chatHistoryName:"",
         totalChatData:0,
         chatDataIds:[]
      })
      await newChatHistory.save();
      return res.status(201).json({
         success:true,
         message:"Successfully created new chat",
         data : newChatHistory
      });
   }
   catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         error : error,
         success:false
      })
   }
}
const deleteGrammarChatHistoryById = async(req,res) => {

   try{
      const id = req.params.id || "";
      const deleteData = await grammarChatHistoryModel.findByIdAndDelete(id);
      if(!deleteData){
         return res.status(404).json({
            success:false,
            message:"No record found to delete",
         })
      }
      return res.status(200).json({
         success: true,
         message: "Successfully deleted the chat history",
      });
   }
   catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         error : error,
         success:false
      })
   }
}

module.exports = {getAllGrammarChatHistory,getGrammarChatHistoryById,createNewGrammarChatHistory,deleteGrammarChatHistoryById};