import { format } from "date-fns";

export function formatUTCDateToDateString(UTCDate: string | number) {
  const date = new Date(UTCDate);
  const formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
}
