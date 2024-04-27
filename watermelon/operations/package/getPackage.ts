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

// `${Q.sanitizeLikeString("jas")}%`
export const observeAndFilterPackages = (searchTerm: string) =>
  packagesCollection
    .query(
      Q.or(
        Q.where("receiverName", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`)),
        Q.where("courierName", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`)),
        Q.where(
          "packageScanId",
          Q.like(`${Q.sanitizeLikeString(searchTerm)}%`)
        ),
        Q.where("id", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`))
      ),
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
      Q.take(50)
    )
    .observe();
};
