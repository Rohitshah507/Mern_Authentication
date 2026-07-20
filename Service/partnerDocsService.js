import { uploadCloudinary, deleteCloudinary } from "../Config/Cloudinary.js";
import PartnerDocs from "../Models/PartnerDocs.js";

const partnerDocsService = async (citizenship, billBook, license, user) => {
  if (!citizenship || !billBook || !license) {
    throw { statusCode: 400, message: "Data is not found" };
  }

  const partner = await PartnerDocs.findOne({ owner: user });

  if (partner) {
    throw { statusCode: 400, message: "Document have already been Uploaded" };
  }
  const uploadedResults = await uploadCloudinary([
    citizenship,
    billBook,
    license,
  ]);

  const partnerDocs = await PartnerDocs.create({
    owner: user,
    citizenshipUrl: uploadedResults[0].secure_url,
    citizenshipUrlPublicId: uploadedResults[0].citizenshipUrlPublicId,
    billBookUrl: uploadedResults[1].secure_url,
    billBookUrlPublicId: uploadedResults[1].billBookUrlPublicId,
    licenseUrl: uploadedResults[2].secure_url,
    licenseUrlPublicId: uploadedResults[2].licenseUrlPublicId,
    partnershipStatus: "Pending",
    rejectionReason: null,
  });
  return partnerDocs;
};

const getPartnerDocsService = async (userId) => {
  const getPartnerDocs = await PartnerDocs.findOne({ owner: userId }).populate(
    "User",
    "name",
  );
  return getPartnerDocs;
};

const updatePartnerDocsService = async (id, citizenship, billBook, license) => {
  if (!citizenship || !billBook || !license) {
    throw { statusCode: 400, message: "Data is not found" };
  }

  const deletingFiles = await PartnerDocs.findById(id);
  if (!deletingFiles) {
    throw { statusCode: 404, message: "Partner Document not Found" };
  }

  // Delete previous files from Cloudinary
  await Promise.all([
    deleteCloudinary(deletingFiles.citizenshipUrl),
    deleteCloudinary(deletingFiles.billBookUrl),
    deleteCloudinary(deletingFiles.licenseUrl),
  ]);

  const uploadedResults = await uploadCloudinary([
    citizenship,
    billBook,
    license,
  ]);

  const updatedDocs = await PartnerDocs.findByIdAndUpdate(
    id,
    {
      citizenshipUrl: uploadedResults[0].secure_url,
      billBookUrl: uploadedResults[1].secure_url,
      licenseUrl: uploadedResults[2].secure_url,
      partnershipStatus: "Pending",
      rejectionReason: null,
    },
    { new: true },
  );
  return updatedDocs;
};

export { partnerDocsService, getPartnerDocsService, updatePartnerDocsService };
