import { doc, getDoc } from "firebase/firestore";
import { getUserId } from "./auth";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";

export const getCompany = async ({
  companyID,
}: {
  companyID: string;
}): Promise<Company> => {
  try {
    const companyDocReference = doc(db, Collections.companies, companyID);
    const companyDocSnapshot = await getDoc(companyDocReference);
    if (companyDocSnapshot.exists()) {
      return companyDocSnapshot.data() as Company;
    } else {
      throw generateCustomError({ errorKey: "companyIdNotFound" });
    }
  } catch (error) {
    throw error;
  }
};
