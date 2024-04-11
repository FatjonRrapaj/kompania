// src/models/Customer.ts

import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

class CustomerModel extends Model {
  static table = "customers";

  @text("name") name!: string;
  @text("phoneNumber") phoneNumber!: string;
  @text("lat") lat?: string;
  @text("lng") lng?: string;
  @text("addressDescription") addressDescription?: string;
  @text("notes") notes?: string;
  @text("profileLink") profileLink?: string;
  @text("createdAt") createdAt!: number;
}

export default CustomerModel;
