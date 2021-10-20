interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  datePlusDays(date: Date, days: number): Date;
  datePlusHour(date: Date, hours: number): Date;
}

export { IDateProvider };
