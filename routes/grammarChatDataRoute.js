const express = require("express");
const { getAllGrammarChatData, createNewGrammarChatData, getAllGrammarChatDataByChatHistoryID, updateGrammarChatDataByChatID } = require("../controller/grammarChatDataController");
const { verifyUser } = require("../controller/authVerify");
const router = express.Router();

router.route("/")
.get(verifyUser,getAllGrammarChatData)
.post(verifyUser,createNewGrammarChatData)
.get(verifyUser,getAllGrammarChatDataByChatHistoryID);
router.route("/:id")
.put(verifyUser,updateGrammarChatDataByChatID);

module.exports = router;