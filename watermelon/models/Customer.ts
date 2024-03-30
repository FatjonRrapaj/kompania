// src/models/Customer.ts

import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class CustomerModel extends Model {
  static table = "customers";

  @field("name") name!: string;
  @field("phoneNumber") phoneNumber!: string;
  @field("lat") lat?: string;
  @field("lng") lng?: string;
  @field("addressDescription") addressDescription?: string;
  @field("notes") notes?: string;
  @field("profileLink") profileLink?: string;
  @field("createdAt") createdAt!: number;
}

export default CustomerModel;
