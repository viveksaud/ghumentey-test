const express= require('express');
const router = express.Router();
const {getAllDestinations, createDestination, getSingleDestinations, deleteDestination} = require('../controllers/destination')

router.route('/').get(getAllDestinations).post(createDestination);
router.route('/:id').get(getSingleDestinations).delete(deleteDestination);

module.exports = router;