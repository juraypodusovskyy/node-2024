import dayjs from "dayjs";

class TimeHelper {
  public getTime(value: number, unit?: dayjs.ManipulateType): Date {
    const time = dayjs();
    return time.subtract(value, unit).toDate();
  }
  public parseConfigString(config: string): string {
    return config.split(" ")[0];
  }
}

export const timeHelper = new TimeHelper();
