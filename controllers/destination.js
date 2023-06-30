const Destination = require("../models/Destination");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllDestinations = async (req, res) => {
  const destinations = await Destination.find({});
  res.status(200).json({ destinations });
};

const getSingleDestinations = async (req, res) => {
  const { id: Destinationid } = req.params;
  const destination = await Destination.find({ _id: Destinationid });

  if (!destination) {
    throw new NotFoundError(`No destination found with id ${Destinationid}`);
  }

  res.status(200).json(destination);
};

const createDestination = async (req, res) => {
  const destination = await Destination.create(req.body);
  res.status(200).json({ destination });
};

const deleteDestination = async (req, res) => {
  const { id: Destinationid } = req.params;
  const destination = await Destination.findOneAndRemove({
    _id: Destinationid,
  });
  if (!destination) {
    throw new NotFoundError(`No destination found with id ${Destinationid}`);
  }
  res.status(200).send("Destination deleted");
};

module.exports = {
  getAllDestinations,
  getSingleDestinations,
  createDestination,
  deleteDestination,
};
