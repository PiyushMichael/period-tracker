declare namespace DateTypes {
  type Period = {
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
    periods: {
      startDate: string;
      endDate?: string;
    }[];
  };
}
