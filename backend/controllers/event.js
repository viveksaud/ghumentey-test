const Event = require("../models/Event");
const { BadRequestError, NotFoundError } = require('../errors');


const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(200).json({ events });
};

const getSingleEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOne({ _id: eventId });

  if (!event) {
    console.log("No event")
    throw new NotFoundError(`No event found with id ${eventId}`);
  }

  res.status(200).json(event);
};

const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(200).json({ event });
};

const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOneAndRemove({ _id: eventId });
  if (!event) {
    throw new NotFoundError(`No event found with id ${eventId}`);
  }
  res.status(200).send("Event deleted");
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  deleteEvent,
};
