import express from 'express';
import { deleteBooking, getBookingByAll, getBookingById, newBooking } from '../controllers/booking-controller';

const bookingRouter = express.Router();

bookingRouter.get('/:id', getBookingById);
// bookingRouter.get("/", getBookingByAll);
bookingRouter.post('/', newBooking);
bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter;