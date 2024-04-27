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
    return undefined;
  }
};

export const getAllPackagesCount = async () => {
  const count = packagesCollection.query().fetchCount();
  return count;
};

export const getLocalLastUpdatedAt = async () => {
  const latestPackages: PackageModel[] = await packagesCollection
    .query(Q.sortBy("updatedAtDate", Q.desc), Q.take(1))
    .fetch();
  return latestPackages[0]?.updatedAtDate;
};

export const observePackages = () =>
  packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();

export const observeAndFilterPackages = (searchTerm: string) =>
  packagesCollection
    .query(
      Q.or(Q.where("receiverName", Q.includes(searchTerm))),
      Q.or(Q.where("courierName", Q.includes(searchTerm))),
      Q.or(Q.where("packageScanId", Q.includes(searchTerm))),
      Q.or(Q.where("id", Q.includes(searchTerm))),
      Q.sortBy("updatedAtDate", Q.desc)
    )
    .observe();

export const findAndObservePackage = (packageId: string) =>
  packagesCollection.findAndObserve(packageId);

export const observeLastWeekPackages = () => {
  // const lastWeekTimeStamp = new Date().setDate(new Date().getDate() - 7);

  return packagesCollection
    .query(
      // Q.where("updatedAtDate", Q.gte(lastWeekTimeStamp)),
      Q.sortBy("updatedAtDate", Q.desc),
      Q.take(100)
    )
    .observe();
};

//Maybe you do not need a second packages table just one that queries and gets the fresh packages, last week or last 30.

//TODO: I think from here you can change the query type and fetch specific packages
// export const observePackages = () =>
//   packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();
