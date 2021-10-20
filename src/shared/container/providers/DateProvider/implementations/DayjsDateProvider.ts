import dayjs, { QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compare(start_date: Date, end_date: Date, units: QUnitType): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, units);
  }

  compareInHours(start_date: Date, end_date: Date): number {
    return this.compare(start_date, end_date, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    return this.compare(start_date, end_date, "days");
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
