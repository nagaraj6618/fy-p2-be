const express = require("express");
const { getAllGrammarChatHistory, getGrammarChatHistoryById, createNewGrammarChatHistory, deleteGrammarChatHistoryById } = require("../controller/grammarChatHistoryController");
const router = express.Router();


router.route("/").get(getAllGrammarChatHistory).post(createNewGrammarChatHistory);
router.route("/:id").get(getGrammarChatHistoryById)
.delete(deleteGrammarChatHistoryById);

module.exports = router;