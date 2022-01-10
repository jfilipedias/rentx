import dayjs, { QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }
  compare(startDate: Date, endDate: Date, units: QUnitType): number {
    const start_date_utc = this.convertToUTC(startDate);
    const end_date_utc = this.convertToUTC(endDate);

    return dayjs(end_date_utc).diff(start_date_utc, units);
  }

  compareInHours(startDate: Date, endDate: Date): number {
    return this.compare(startDate, endDate, "hours");
  }

  compareInDays(startDate: Date, endDate: Date): number {
    return this.compare(startDate, endDate, "days");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  datePlusDays(date: Date, days: number): Date {
    return dayjs(date).add(days, "day").toDate();
  }

  datePlusHour(date: Date, hours: number): Date {
    return dayjs(date).add(hours, "hours").toDate();
  }
}

export { DayjsDateProvider };
