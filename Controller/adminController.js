import PartnerDocs from "../Models/PartnerDocs.js";

const getAllPartnerDocs = async (req, res) => {
  try {
    const partner = await PartnerDocs.find().populate(
      "owner",
      "name email phoneNumber",
    );
    return res.status(201).json({
      success: true,
      message: "All User Document",
      partner,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllPartnerDocs };
