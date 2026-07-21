import PartnerBank from "../Models/PartnerBank.js";

const partnerBankService = async (accountHolderName, accountNumber, userId) => {
  const bank = await PartnerBank.create({
    accountHolderName,
    accountNumber,
  });
  return bank;
};

export {partnerBankService}
