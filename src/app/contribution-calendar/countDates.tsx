export default function countDates(dateArray: string[]): { [key: string]: number } {
  const dateCount: { [key: string]: number } = {};

  for (const date of dateArray) {
    if (dateCount[date]) {
      dateCount[date]++;
    } else {
      dateCount[date] = 1;
    }
  }

  return dateCount;
}
