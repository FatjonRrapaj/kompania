import { Package } from "@/api/package";
import watermelonDB from "@/watermelon";
import PackageModel from "@/watermelon/models/Package";
import { Q } from "@nozbe/watermelondb";

const packagesCollection = watermelonDB.get<PackageModel>("packages");

export const findPackage = async (
  uid: string
): Promise<PackageModel | undefined> => {
  try {
    const existingPackage = await packagesCollection.find(uid);
    return existingPackage as PackageModel;
  } catch (error) {
    console.log("findPackage error: ", error);
    return undefined;
  }
};

export const getAllPackagesCount = async () => {
  const count = packagesCollection.query().fetchCount();
  return count;
};

export const observePackages = () =>
  packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();

export const observeLastWeekPackages = () => {
  const currentTimestamp = new Date().getTime();
  const lastWeekTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000;
  console.log(lastWeekTimestamp);

  return packagesCollection
    .query(
      Q.where("updatedAtDate", Q.gte(2)),
      Q.sortBy("updatedAtDate", Q.desc)
    )
    .observe();
};

//Maybe you do not need a second packages table just one that queries and gets the fresh packages, last week or last 30.

//TODO: I think from here you can change the query type and fetch specific packages
// export const observePackages = () =>
//   packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();
