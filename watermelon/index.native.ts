// src/database/index.ts

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import PackageModel from "./models/Package";
import CustomerModel from "./models/Customer";
import { Platform } from "react-native";
import migrations from "./migrations";

export type TableName = "packages" | "customers";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {
    console.error(error);
    // Database failed to load -- offer the user to reload the app or log out
  },
});

const watermelonDB = new Database({
  adapter,
  modelClasses: [PackageModel, CustomerModel],
});

export default watermelonDB;
