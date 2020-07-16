const express = require("express");
const routes = express.Router();
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");
const uploadconfig = require("./config/upload");
const multer = require("multer");

const upload = multer(uploadconfig);

routes.post("/sessions", SessionController.store);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);
routes.get("/dashboard", DashboardController.show);
routes.post("/spots/:spot_id/booking", BookingController.store);

routes.post("/bookings/:booking_id/approval", ApprovalController.store);
routes.post("/bookings/:booking_id/rejection", RejectionController.store);

routes.get("/spot/:spot_id", SpotController.index);
routes.delete("/spot/:spot_id", DashboardController.destroy);
routes.put("/spot/:spot_id", upload.single("thumbnail"), SpotController.edit);

module.exports = routes;
