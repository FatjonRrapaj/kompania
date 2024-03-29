import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class Company extends Model {
  static table = "companies";

  @field("name") name!: string;
  @field("location") location!: string;
  // Other fields as needed
}

export default Company;
