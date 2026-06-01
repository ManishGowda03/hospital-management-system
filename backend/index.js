// 1 import all libraries.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); // For token verification
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

// import all the routes.
const activityRoutes = require("./routes/ActivityRoutes");
const userRoutes = require("./routes/UserRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const patientRoutes = require("./routes/PatientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const bloodRoutes = require("./routes/BloodRoutes");
const hospitalRoutes = require("./routes/HospitalRoutes");
const TreatmentRouter = require("./routes/TreatmentRoute");
const PediatricRoutes = require("./routes/PediatricRoutes");
const MortuaryRoutes = require("./routes/MortuaryRoutes");
const DischargeRoutes = require("./routes/DischargeRoute");
const AppointmentRoutes = require("./routes/AppointmentRoute");

dotenv.config();

const app = express();
// Middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // Add this middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", activityRoutes);
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", blogRoutes);
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api", bloodRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", TreatmentRouter);
app.use("/api", PediatricRoutes);
app.use("/api", MortuaryRoutes);
app.use("/api", DischargeRoutes);
app.use("/api", AppointmentRoutes);

// connect to mongodb database.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Unable to connect to database,", error);
  });

// create the port number to run the application
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running successfully at port number ${PORT}`);
});
