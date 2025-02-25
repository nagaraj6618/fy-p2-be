const { optimizePrompt } = require("../ML-Model/model");
const AITooLModel = require("../model/aiToolModel");
const { verifyToken } = require("./authVerify");

const getALLChatOfUser = async(req,res) => {
   try{
      const user = verifyToken(req.headers.authorization);
      const AllAIChat = await AITooLModel.find({
         userId:user.id
      });
      if(AllAIChat.length<=0){
         return res.status(404).json({
            message:"No Data found",
            success:false,
         })
      }
      res.status(200).json({
         message:"All the chat retrived..",
         success:true,
         data:AllAIChat
      })
   }catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         success:true
      });
   }
}
const createNewChat = async(req,res) => {
   try{
      const {text,type} = req.body;
      const user = await verifyToken(req.headers.authorization);
      let responseData = null;
      if(type === "prompt"){
         responseData = await optimizePrompt(text);
         // responseData = {...responseData,}
      }
      if(!responseData){
         return res.status(400).json({
            message:"An Error Occured",
            success:false
         })
      }
      const aiNewChat = new AITooLModel({
         request:text,
         response:{
            content:responseData,
            responseOf:type,
         },
         userId:user.id
      });
      await aiNewChat.save();
      return res.status(200).json({
         message:"Response sent for your query",
         success:true,
         data:aiNewChat

      })
   }catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         success:false,
         error
      });
   }
}

const deleteChat = async(req,res) => {
   try{
      const {id} = req.params;
      const user = await verifyToken(req.headers.authorization);
      if(!id){
         return res.status(404).json({
            message:"Please send the chat id to delete",
            success:false,
         })
      };
      const deleteChat = await AITooLModel.deleteMany({
         _id:id,
         userId:user.id
      })
      if(!deleteChat){
         return res.status(404).json({message:"Chat Not found to delete",success:false});
      }
      res.status(200).json({
         message:"Chat deleted successfully",
         success:true
      })
   }catch(error){
      return res.status(500).json({
         message:"Internal Server Error",
         success:false,
         error
      });
   }
}

module.exports  = {getALLChatOfUser,createNewChat,deleteChat};