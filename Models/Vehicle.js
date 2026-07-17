import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    licenseNumber: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["Bike", "Car", "Bus"],
    },
    vehicleModel: {
      type: String,
    },
    waitingCharge: {
      type: Number,
    },
    vehicleStatus: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
