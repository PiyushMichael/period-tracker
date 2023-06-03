declare namespace DateTypes {
  type CalendarPeriod = {
    [key: string]: {
      startingDay?: boolean;
      endingDay?: boolean;
      color: string;
      textColor: string;
    };
  };

  type Log = {
    avgCycle: number;
    periods: string[];
  };

  type MonthYear = {
    month: number;
    year: number;
  };
}
