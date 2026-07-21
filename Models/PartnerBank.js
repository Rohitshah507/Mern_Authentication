import mongoose from "mongoose";

const partnerBankSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    partnerBankStatus: {
      type: String,
      enum: ["Not Added", "Added", "Verified"],
      default: "Not Added",
    },
  },
  { timestamps: true },
);

const PartnerBank = mongoose.model("PartnerBank", partnerBankSchema);

export default PartnerBank;
