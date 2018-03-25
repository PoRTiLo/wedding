/**
 * The constants.
 */

export class PublicHoliday {
  key: string;
  date: Date;
  inMs: number;

  constructor(key: string, date: Date) {
    this.key = key;
    this.date = date;
    this.inMs = date.getTime();
  }
}

export class Constants {
  public static readonly WEDDING_DATE: Date = new Date(2018, 8, 15, 12, 0, 0, 0);
  public static readonly WEDDING_DATE_MS = Constants.WEDDING_DATE.getTime();
  // 1 second in milliseconds
  public static readonly ONE_SECOND_IN_MS = 1000;
  // 1 minute in milliseconds
  public static readonly ONE_MINUTE_IN_MS = 1000 * 60;
  // 1 hour in milliseconds
  public static readonly ONE_HOUR_IN_MS = 1000 * 60 * 60;
  // 1 day in milliseconds
  public static readonly ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  // 30. March
  private static readonly GOOD_FRIDAY: PublicHoliday = new PublicHoliday('publicHoliday.goodFriday', new Date(2018, 2, 30, 0, 0, 0, 0));
  // 1. April
  private static readonly EASTER_MONDAY: PublicHoliday = new PublicHoliday('publicHoliday.easterMonday', new Date(2018, 3, 1, 0, 0, 0, 0));
  // 1. May
  private static readonly LABOUR_DAY: PublicHoliday = new PublicHoliday('publicHoliday.labourDay', new Date(2018, 4, 1, 0, 0, 0, 0));
  // 8. May
  private static readonly LIBERATION_DAY: PublicHoliday = new PublicHoliday('publicHoliday.liberationDay', new Date(2018, 4, 8, 0, 0, 0, 0));
  // 5. July
  private static readonly SAINTS_CYRIL_AND_METHODIUS_DAY: PublicHoliday = new PublicHoliday('publicHoliday.saintsCyrilandMethodiusDay', new Date(2018, 5, 5, 0, 0, 0, 0));
  // 6. July
  private static readonly JAN_HUS_DAY: PublicHoliday = new PublicHoliday('publicHoliday.janHusDay', new Date(2018, 5, 6, 0, 0, 0, 0));
  // public holidays 2018 (30. March - 6. July)
  private static readonly PUBLIC_HOLIDAYS: PublicHoliday[] = [Constants.GOOD_FRIDAY, Constants.EASTER_MONDAY,
      Constants.LABOUR_DAY, Constants.LIBERATION_DAY, Constants.SAINTS_CYRIL_AND_METHODIUS_DAY, Constants.JAN_HUS_DAY];

  /**
   *
   * @param {Date} date1
   * @param {Date} date2
   * @returns {number}
   */
  static daysBetween(date1: Date, date2InMs: number): number {
    // Get 1 day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1InMs = date1.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = date2InMs - date1InMs;

    // Convert back to days and return
    return Math.floor(differenceMs / oneDay);
  }

  private static remainingMilliSeconds(): number {
    // Calculate the difference in millisecond
    return Math.floor(this.WEDDING_DATE_MS - Date.now());
  }

  public static remainingSeconds(): number {
    // subtract days
    let milliseconds = this.remainingMilliSeconds() - this.remainingDays() * this.ONE_DAY_IN_MS;
    // subtract hours
    milliseconds = milliseconds - this.remainingHours() * this.ONE_HOUR_IN_MS;
    // subtract minutes
    milliseconds = milliseconds - this.remainingMinutes() * this.ONE_MINUTE_IN_MS;
    // Calculate the difference in seconds
    return Math.floor(milliseconds / this.ONE_SECOND_IN_MS);
  }

  public static remainingMinutes(): number {
    // subtract days
    let milliseconds = this.remainingMilliSeconds() - this.remainingDays() * this.ONE_DAY_IN_MS;
    // subtract hours
    milliseconds = milliseconds - this.remainingHours() * this.ONE_HOUR_IN_MS;
    // Calculate the difference in minutes
    return Math.floor(milliseconds / this.ONE_MINUTE_IN_MS);
  }

  public static remainingHours(): number {
    const milliseconds = this.remainingMilliSeconds() - this.remainingDays() * this.ONE_DAY_IN_MS;
    // Calculate the difference in hours
    return Math.floor(milliseconds / this.ONE_HOUR_IN_MS);
  }

  public static remainingDays(): number {
    // Calculate the difference in seconds
    return Math.floor(this.remainingMilliSeconds() / this.ONE_DAY_IN_MS);
  }

  public static remainingPublicHolidays(): PublicHoliday[] {
    const nowInMs = Date.now();
    const publicHolidays: PublicHoliday[] = [];
    for (const holiday of this.PUBLIC_HOLIDAYS) {
      if (nowInMs < holiday.inMs) {
        publicHolidays.push(holiday);
      }
    }
    return publicHolidays;
  }
}
