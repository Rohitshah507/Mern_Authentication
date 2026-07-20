import PartnerDocs from "../Models/PartnerDocs.js";
import User from "../Models/User.js";
import {
  partnerDocsService,
  getPartnerDocsService,
  updatePartnerDocsService,
} from "../Service/partnerDocsService.js";

const partnerDocs = async (req, res) => {
  try {
    const citizenship = req.files.citizenship?.[0]; //each image have a separate array and each image are stored in each array
    const billBook = req.files.billBook?.[0];
    const license = req.files.license?.[0];

    if (!citizenship || !billBook || !license) {
      return res.status(400).send({
        message: "All File is required",
      });
    }

    const user = await User.findById(req.user._id);

    const partnerDocuments = await partnerDocsService(
      citizenship,
      billBook,
      license,
      req.user._id,
    );

    if (user.partnerOnBoardingSteps < 2) {
      user.partnerOnBoardingSteps = 2;
      await user.save();
    }

    return res.status(201).json({
      success: true,
      message: "Files Uploaded Successfully",
      partnerDocuments,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const getPartnerDocs = async (req, res) => {
  try {
    const document = await PartnerDocs.findOne({ owner: req.user._id });

    if (
      !document.citizenshipUrl ||
      !document.billBookUrl ||
      !document.licenseUrl
    ) {
      return res.status(404).json({
        success: false,
        message: "Document is not found",
      });
    }

    const getDocument = await getPartnerDocsService(req.user_.id);

    return res.status(201).json({
      success: true,
      message: "Here is the Document"
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: `Get Document Error ${error.message}`
    })
  }
};

const updatePartnerDocs = async (req, res) => {
  try {
    const citizenship = req.files.citizenship?.[0];
    const billBook = req.files.billBook?.[0];
    const license = req.files.license?.[0];

    if (!citizenship || !billBook || !license) {
      return res.status(400).json({
        success: false,
        message: "All files are required",
      });
    }

    const partner = await PartnerDocs.findOne({ owner: req.user._id });

    if (!partner) {
      return res.status(402).json({
        success: "false",
        message: "Partner does not Exist",
      });
    }

    if (partner.partnershipStatus !== "Reject") {
      return res.status(400).send({
        message: "Document cannot be updated",
      });
    }

    if (!partner) {
      return res.status(402).json({
        success: "false",
        message: "Partner does not Exist",
      });
    }

    const user = await User.findById(req.user._id);

    const updatePartner = await updatePartnerDocsService(
      partner._id,
      citizenship,
      billBook,
      license,
    );

    await partner.save();

    if (user.partnerOnBoardingSteps < 2) {
      user.partnerOnBoardingSteps = 2;
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Update Successfully",
      updatePartner,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { partnerDocs, getPartnerDocs, updatePartnerDocs };
