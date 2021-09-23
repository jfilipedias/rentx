interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  datePlusHour(date: Date, hours: number): Date;
}

export { IDateProvider };
