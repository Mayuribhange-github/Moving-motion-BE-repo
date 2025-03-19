import express from "express";
import { addBid, bookVehicle, cancelOrder, completedOrders, getBookings, getCompletedOrders, orderStatus } from "../controllers/booking.controller.js";
import { auth } from "../middleware/authorization.js";

const router = express.Router();
router.route("/book-vehicle").get(getBookings).post(bookVehicle);
router.route("/add-bid").post(addBid);
router.route("/order-status").post(orderStatus);
router.get("/complete-orders/:id",getCompletedOrders)
router.post("/complete-orders",completedOrders);
router.post("/cancel-order",cancelOrder);
export default router;