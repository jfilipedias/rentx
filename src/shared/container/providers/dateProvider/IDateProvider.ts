interface IDateProvider {
  compareIfBefore(startDate: Date, endDate: Date): boolean;
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  datePlusDays(date: Date, days: number): Date;
  datePlusHour(date: Date, hours: number): Date;
}

export { IDateProvider };
