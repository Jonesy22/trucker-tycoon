import {
  differenceInCalendarDays,
  addMonths,
  startOfMonth,
  add,
  isSameDay,
  format,
} from "date-fns";

const START_DATE = new Date();

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function daysUntilFirstDayOfNextMonth(daysFromToday = 0) {
  const currentDate = add(START_DATE, { days: daysFromToday });
  const firstDayOfNextMonth = startOfMonth(addMonths(currentDate, 1));
  const daysDifference = differenceInCalendarDays(
    firstDayOfNextMonth,
    currentDate
  );
  return daysDifference;
}

export function isFirstDayOfMonth(daysFromToday = 0) {
  const currentDate = add(START_DATE, { days: daysFromToday });
  const firstDayOfMonth = startOfMonth(currentDate);
  return isSameDay(currentDate, firstDayOfMonth);
}

export function dateFormatter(daysFromStart: number): string {
  return format(add(START_DATE, { days: daysFromStart }), "PPP");
}

export function dateFormatterShort(daysFromStart: number): string {
  return format(add(START_DATE, { days: daysFromStart }), "PP");
}
