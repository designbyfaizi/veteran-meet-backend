const express = require('express');

const router = express.Router();

// Auth Middleware
const communityAuth = require("../middleware/community-auth")

//Controllers
const communityController = require("../controllers/community")

router.post("/signup", communityController.postCommunitySignUp)

router.post("/login", communityController.postCommunityLogin)

router.post("/create-event",communityAuth, communityController.postEvent)

router.put("/edit-event",communityAuth, communityController.putEditEvent)

router.delete("/delete-event/:eventId",communityAuth, communityController.deleteEvent)

router.get("/events", communityController.getEvents)

router.get("/events/:eventId", communityController.getEvent)

module.exports = router;