import { FieldValue } from "firebase/firestore";
import i18next from "i18next";

export type ReceivedFirebaseServerTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export const isReceivedFirebaseServerTimestamp = (
  date?: FieldValue | ReceivedFirebaseServerTimestamp
): date is ReceivedFirebaseServerTimestamp =>
  (date as ReceivedFirebaseServerTimestamp)?.seconds !== undefined;

export const getDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthName = i18next.t(`months:${monthIndex}`);
  return `${day} ${monthName}, ${year}`;
};

export const getHHMMfromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeString = `${hours}:${minutes.toString().padStart(2, "0")}`;
  return timeString;
};
