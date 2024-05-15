// src/models/Customer.ts

import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

class CustomerModel extends Model {
  static table = "customers";

  @text("name") name!: string;
  @text("phoneNumber") phoneNumber!: string;
  @text("lat") lat?: number;
  @text("lng") lng?: number;
  @text("addressDescription") addressDescription?: string;
  @text("profileLink") profileLink?: string;
  @text("createdAtDate") createdAtDate?: number;
}

export default CustomerModel;
