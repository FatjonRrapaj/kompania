import { FieldValue } from "firebase/firestore";

export type ReceivedFirebaseServerTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export const isReceivedFirebaseServerTimestamp = (
  date?: FieldValue | ReceivedFirebaseServerTimestamp
): date is ReceivedFirebaseServerTimestamp =>
  (date as ReceivedFirebaseServerTimestamp)?.seconds !== undefined;
