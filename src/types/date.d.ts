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
    avgDuration: number;
    periods: Entry[];
  };

  type Entry = {
    startDate: string;
    endDate?: string;
  };

  type MonthYear = {
    month: number;
    year: number;
  };
}
