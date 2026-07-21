import PartnerBank from "../Models/PartnerBank.js";
import User from "../Models/User.js";
import { partnerBankService } from "../Service/partnerBankService.js";

const partnerBank = async (req, res) => {
  try {
    const { accountHolderName, accountNumber } = req.body;
    if (!accountHolderName || !accountNumber) {
      return res.status(404).json({
        success: false,
        message: "All Data are required",
      });
    }

    const user = await User.findById(req.user._id);

    const partnerBank = await PartnerBank.findOne({ owner: req.user._id });

    if (partnerBank) {
      return res.status(400).json({
        success: false,
        message: "Partner Bank already exists",
      });
    }

    const bank = await partnerBankService(
      accountHolderName,
      accountNumber,
      partnerBank,
    );

    if (user.partnerOnBoardingSteps < 3) {
      user.partnerOnBoardingSteps = 3;
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Bank Details are successfully added",
      bank,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: `Bank Details Error ${error.message}`,
    });
  }
};

export { partnerBank };
