import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "packages",
      columns: [
        { name: "packageFirebaseId", type: "string" },
        { name: "packageScanId", type: "string" },

        { name: "packageName", type: "string", isOptional: true },
        { name: "packageWeight", type: "number", isOptional: true },
        { name: "packageLength", type: "number", isOptional: true },
        { name: "packageWidth", type: "number", isOptional: true },
        { name: "packageHeight", type: "number", isOptional: true },
        { name: "isFragile", type: "boolean", isOptional: true },
        { name: "canBeOpened", type: "boolean" },

        { name: "paymentAmount", type: "number" },
        { name: "shippingCost", type: "number" },
        { name: "cashOnDelivery", type: "number" },
        { name: "currencyName", type: "string" },
        { name: "currencySymbol", type: "string" },

        { name: "packageStatus", type: "string" },
        { name: "packageTimeLineStatus", type: "string" },

        { name: "createdAt", type: "number" },
        { name: "postedAt", type: "number" },
        { name: "acceptedAt", type: "number", isOptional: true },
        { name: "pickedAt", type: "number", isOptional: true },
        { name: "deliveredAt", type: "number", isOptional: true },
        { name: "returnedAt", type: "number", isOptional: true },
        { name: "updatedAt", type: "number", isOptional: true },

        { name: "courierName", type: "string", isOptional: true },
        { name: "courierSurname", type: "string", isOptional: true },
        { name: "courierId", type: "string", isOptional: true },
        { name: "courierProfilePicture", type: "string", isOptional: true },
        { name: "courierPhoneNumber", type: "string", isOptional: true },

        { name: "receiverId", type: "string", isOptional: true },
        { name: "receiverName", type: "string", isOptional: true },
        { name: "receiverProfileUrl", type: "string", isOptional: true },
        {
          name: "receiverAddressDescription",
          type: "string",
          isOptional: true,
        },
        { name: "receiverAddressLat", type: "number", isOptional: true },
        { name: "receiverAddressLng", type: "number", isOptional: true },
        { name: "receiverPhoneNumber", type: "string", isOptional: true },
        { name: "notesForReceiver", type: "string", isOptional: true },

        { name: "companyLocationLat", type: "number", isOptional: true },
        { name: "companyLocationLng", type: "number", isOptional: true },
        {
          name: "companyLocationDescription",
          type: "string",
          isOptional: true,
        },
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
