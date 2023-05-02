import { Router } from "express";
import { authenticate, isLoggedIn } from "../../helpers/authService";
import bookingControllers from "../controllers";

const bookingsRouter = Router();

bookingsRouter.use(authenticate);
bookingsRouter.use(isLoggedIn);

bookingsRouter.get("/", bookingControllers.AllBookingsController)
bookingsRouter.post("/new-booking", bookingControllers.CreateBookingController)
bookingsRouter.get("/modify-booking", bookingControllers.UpdateBookingController)
bookingsRouter.get("/remove-booking", bookingControllers.DeleteBookingController)


export default bookingsRouter;