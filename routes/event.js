const express = require('express')
const router = express.Router()
const {getAllEvents, createEvent, getSingleEvent, deleteEvent} = require("../controllers/event")

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getSingleEvent).delete(deleteEvent);

module.exports = router;