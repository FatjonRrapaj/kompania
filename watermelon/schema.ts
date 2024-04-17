import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "packages",
      columns: [
        { name: "packageScanId", type: "string" },

        { name: "packageName", type: "string", isOptional: true },
        { name: "packageWeight", type: "string", isOptional: true },
        { name: "packageLength", type: "string", isOptional: true },
        { name: "packageWidth", type: "string", isOptional: true },
        { name: "packageHeight", type: "string", isOptional: true },
        { name: "isFragile", type: "boolean", isOptional: true },
        { name: "canBeOpened", type: "boolean" },

        { name: "paymentAmount", type: "string" },
        { name: "shippingCost", type: "string" },
        { name: "cashOnDelivery", type: "string" },
        { name: "currencyName", type: "string" },
        { name: "currencySymbol", type: "string" },

        { name: "packageStatus", type: "string" },
        { name: "packageTimeLineStatus", type: "string" },

        { name: "createdAtDate", type: "string" },
        { name: "postedAtDate", type: "string" },
        { name: "acceptedAtDate", type: "string", isOptional: true },
        { name: "pickedAtDate", type: "string", isOptional: true },
        { name: "deliveredAtDate", type: "string", isOptional: true },
        { name: "returnedAtDate", type: "string", isOptional: true },
        { name: "updatedAtDate", type: "string", isOptional: true },

        { name: "courierName", type: "string", isOptional: true },
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
