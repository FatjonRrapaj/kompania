import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "packages",
      columns: [
        { name: "packageId", type: "string" },
        { name: "packageName", type: "string", isOptional: true },
        { name: "packageWeight", type: "number", isOptional: true },
        { name: "packageLength", type: "number", isOptional: true },
        { name: "packageWidth", type: "number", isOptional: true },
        { name: "packageHeight", type: "number", isOptional: true },
        { name: "paymentAmount", type: "number" },
        { name: "shippingCost", type: "number" },
        { name: "currencyName", type: "string" },
        { name: "currencySymbol", type: "string" },
        { name: "fragile", type: "boolean" },
        { name: "canBeOpened", type: "boolean" },
        { name: "packageStatus", type: "string" },
        { name: "packageTimeLineStatus", type: "string" },
        { name: "createdAt", type: "number" },
        { name: "postedAt", type: "number" },
        { name: "acceptedAt", type: "number", isOptional: true },
        { name: "pickedAt", type: "number", isOptional: true },
        { name: "deliveredAt", type: "number", isOptional: true },
        { name: "returnedAt", type: "number", isOptional: true },
        { name: "courierName", type: "string", isOptional: true },
        { name: "courierSurname", type: "string", isOptional: true },
        { name: "courierId", type: "string", isOptional: true },
        { name: "courierProfilePicture", type: "string", isOptional: true },
        { name: "courierPhoneNumber", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "customers",
      columns: [
        { name: "name", type: "string" },
        { name: "phoneNumber", type: "string" },
        { name: "lat", type: "string", isOptional: true },
        { name: "lng", type: "string", isOptional: true },
        { name: "addressDescription", type: "string", isOptional: true },
        { name: "addressDescription", type: "string", isOptional: true },
        { name: "notes", type: "string", isOptional: true },
        { name: "profileLink", type: "string", isOptional: true },
      ],
    }),
  ],
});

export default schema;
