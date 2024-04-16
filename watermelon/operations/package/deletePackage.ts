import watermelonDB from "@/watermelon";
import PackageModel from "@/watermelon/models/Package";

export const deleteExistingPackage = async (existingPackage: PackageModel) => {
  try {
    await watermelonDB.write(async () => {
      existingPackage.destroyPermanently();
    });
  } catch (error) {}
};
