const Community = require("../models/community");
const Event = require("../models/event");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "We are participating in Nascon and we are proud of that :D";

exports.postCommunitySignUp = async (req, res, next) => {
  try {
    const { communityName, ownerName, communityEmail, communityPassword } =
      req.body;
    if (!communityName || !ownerName || !communityEmail || !communityPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Fill all details!" });
    }
    const communityExists = await Community.findOne({ communityEmail });
    if (communityExists) {
      return res.status(400).json({
        status: "error",
        message: "Community Email Already Exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(communityPassword, 12);
    const community = new Community({
      communityName,
      ownerName,
      communityEmail,
      communityPassword: hashedPassword,
    });
    const newCommunity = await community.save();

    res.json({
      status: "success",
      message: "Community Created Successfully!",
      newCommunity,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.postCommunityLogin = async (req, res, next) => {
  try {
    const { communityEmail, communityPassword } = req.body;
    console.log("communityPassword", communityPassword);
    const community = await Community.findOne({ communityEmail });
    if (!community) {
      return res.status(400).json({
        status: "error",
        message: "Community Does not Exist!",
      });
    }
    const doMatch = await bcrypt.compare(
      communityPassword,
      community.communityPassword
    );
    console.log("doMatch", doMatch);
    if (!doMatch) {
      return res.status(400).json({
        status: "error",
        message: "Wrong Password!",
      });
    }
    const payload = { email: communityEmail, id: communityPassword };
    let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    res.json({
      status: "success",
      message: "Logged in Successfully!",
      token,
      community,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.postEvent = async (req, res, next) => {
  try {
    const { eventName, eventDescription, eventHobby, totalStars, date } =
      req.body;

    if (!eventName || !eventDescription || !eventHobby || !totalStars) {
      return res
        .status(400)
        .json({ status: "error", message: "Fill all details!" });
    }
    const event = new Event({
      eventName,
      eventDescription,
      eventHobby,
      expendedStars: 0,
      totalStars,
      date,
    });
    await event.save();

    res.json({
      status: "success",
      message: "Event Created Successfully!",
      event,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res
        .status(400)
        .json({ status: "error", message: "No Event Found!" });
    }
    res.json({
        status: "success",
        message:"Event deleted successfully!",
        event
    })

  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    if (!events) {
      return res
        .status(400)
        .json({ status: "error", message: "No Events Added!" });
    }
    res.json({
      status: "success",
      message: "Events Fetched Successfully!",
      events,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    console.log("eventId", eventId);
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(400)
        .json({ status: "error", message: "No Event Found!" });
    }
    res.json({
      status: "success",
      message: "Event Fetched Successfully!",
      event,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
