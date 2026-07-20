import mongoose from "mongoose";

const partnerDocsSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    citizenshipUrl: {
      type: String,
      required: true,
    },
    citizenshipUrlPublicId: {
      type: String,
      required: true,
    },
    billBookUrl: {
      type: String,
      required: true,
    },
    billBookUrlPublicId: {
      type: String,
      required: true,
    },
    licenseUrl: {
      type: String,
      required: true,
    },
    licenseUrlPublicId: {
      type: String,
      required: true,
    },
    partnershipStatus: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true },
);

const PartnerDocs = mongoose.model("PartnerDocs", partnerDocsSchema);

export default PartnerDocs;
