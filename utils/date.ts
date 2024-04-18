import { ReceivedFirebaseServerTimestamp } from "@/api/package";
import { FieldValue } from "firebase/firestore";

export const isReceivedFirebaseServerTimestamp = (
  date?: FieldValue | ReceivedFirebaseServerTimestamp
): date is ReceivedFirebaseServerTimestamp =>
  (date as ReceivedFirebaseServerTimestamp).seconds !== undefined;
