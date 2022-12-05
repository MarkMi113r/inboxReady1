export function AddHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export function AddMinutes(numOfMinutes: number, date = new Date()) {
  date.setTime(date.getTime() + numOfMinutes * 60 * 1000);

  return date;
}

export function AddDays(numOfDays: number, date = new Date()) {
  date.setTime(date.getTime() + numOfDays * 60 * 60 * 24 * 1000);

  return date;
}
