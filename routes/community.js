const express = require('express');

const router = express.Router();

//Controllers
const communityController = require("../controllers/community")

router.post("/signup", communityController.postCommunitySignUp)

router.post("/login", communityController.postCommunityLogin)

router.post("/create-event", communityController.postEvent)

router.delete("/delete-event/:eventId", communityController.deleteEvent)

router.get("/events", communityController.getEvents)

router.get("/events/:eventId", communityController.getEvent)

module.exports = router;