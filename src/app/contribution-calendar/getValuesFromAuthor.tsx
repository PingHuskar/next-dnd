import countDates from "./countDates";
import data from "./dist.json";

export default function getValuesFromAuthor(Author: string) {
  const dates = data
    .filter((item) => item.author === Author)
    .map((item) => new Date(item.date).toISOString().split("T")[0]);

  return countDates(dates);
}