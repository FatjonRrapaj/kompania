// src/database/index.ts

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import Package from "./models/Package";
import Customer from "./models/Customer";
import { Platform } from "react-native";

export type TableName = "packages" | "customers";

const adapter = new SQLiteAdapter({
  schema,
  jsi: Platform.OS === "ios",
});

const database = new Database({
  adapter,
  modelClasses: [Package, Customer],
});

export default database;

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
