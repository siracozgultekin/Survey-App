export function formatISOToCustomString(isoString: string): {
  datePart: string;

  timePart: string;
} {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  const seconds = String(date.getSeconds()).padStart(2, "0");

  const datePart = `${day}.${month}.${year}`;

  const timePart = `${hours}:${minutes}:${seconds}`;

  return { datePart, timePart };
}
