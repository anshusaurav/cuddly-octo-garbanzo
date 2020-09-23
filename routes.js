//CREATE ROUTER
const express = require("express");
const router = express.Router();

//IMPORT CONTROLLERS
const bot = require("./controllers/bot");
const slash = require("./controllers/slash");
const status = require("./controllers/status")

//GET APIS
router.get('/', bot.connect);
router.get("/status", status.channel_status);

//POST APIS
router.post("/bot", bot.bot_message);
router.post("/slash", slash.slash_command);


module.exports = router;
