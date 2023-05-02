import { Router } from "express";
import bookingsRouter from "../bookings/routes";
import usersRouter from "../users/routes";

const carWashRouters = Router();


carWashRouters.use("/bookings", bookingsRouter);
carWashRouters.use("/users", usersRouter);

export default carWashRouters;