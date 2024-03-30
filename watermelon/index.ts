// src/database/index.ts

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import PackageModel from "./models/Package";
import CustomerModel from "./models/Customer";
import { Platform } from "react-native";

export type TableName = "packages" | "customers";

const adapter = new SQLiteAdapter({
  schema,
  jsi: Platform.OS === "ios",
});

const watermelonDB = new Database({
  adapter,
  modelClasses: [PackageModel, CustomerModel],
});

export default watermelonDB;

//TODO: create package operations
//QUERY package operations
//ADD MULTIPLE PACKAGES OPERATIONS
//CAREFUL SYNCIN W FIREBASE OPERATIONS (last updated dates comparison & queries)

// async function createPackage() {
//   await database.action(async () => {
//     const newPackage = await database.collections
//       .get<Package>("packages")
//       .create((pkg) => {
//         pkg.packageId = ""
//         pkg.packageName = \\        pkg.packageWeight = packageData.packageWeight;
//       });
//     console.log("Created package:", newPackage);
//   });
// }
