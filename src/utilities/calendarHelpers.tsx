import moment from 'moment';

/**
 * function to return marked periods on calendar
 * @param startDate
 * @param endDate
 * @returns MarkedDate
 */
export const getMarkedPeriod = (
  startDate?: string,
  endDate?: string,
  color?: string,
  textColor?: string,
): DateTypes.CalendarPeriod => {
  if (!startDate) {
    return {};
  }
  if (!endDate) {
    return {
      [startDate]: {
        color: color || '#50cebb',
        textColor: textColor || 'white',
      },
    };
  }
  const markObj: DateTypes.CalendarPeriod = {
    [startDate]: {
      startingDay: true,
      color: color || '#50cebb',
      textColor: textColor || 'white',
    },
    [endDate]: {
      endingDay: true,
      color: color || '#50cebb',
      textColor: textColor || 'white',
    },
  };
  let dt = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
  while (dt !== endDate) {
    markObj[dt] = {
      color: color || '#50cebb',
      textColor: textColor || 'white',
    };
    dt = moment(dt).add(1, 'days').format('YYYY-MM-DD');
  }
  return markObj;
};

/**
 * Function to get pregnancy test dates of given period log
 * @param log DateTypes.Log
 * @returns string[]
 */
export const getPregnancyTestDates = (log: DateTypes.Log): string[] => {
  return log.periods.map((p) => moment(p).add(1, 'days').format('YYYY-MM-DD'));
};

/**
 * Function to get ovulation dates of given period log
 * @param log DateTypes.Log
 * @returns string[]
 */
export const getOvulationDates = (log: DateTypes.Log): string[] => {
  return log.periods.map((p) =>
    moment(p)
      .add(log.avgCycle - 14, 'days')
      .format('YYYY-MM-DD'),
  );
};

/**
 * Function to get ovulation periods
 * @param log DateTypes.Log
 * @returns { start: string; end: string }[]
 */
export const getFertileWindows = (
  log: DateTypes.Log,
): { start: string; end: string }[] => {
  return log.periods.map((p) => ({
    start: moment(p)
      .add(log.avgCycle - 18, 'days')
      .format('YYYY-MM-DD'),
    end: moment(p)
      .add(log.avgCycle - 13, 'days')
      .format('YYYY-MM-DD'),
  }));
};

export const getPeriodCalendar = (
  periodLog: DateTypes.Log,
  monthYear: DateTypes.MonthYear,
): DateTypes.CalendarPeriod => {
  const bracketDates = get3MonthBracketDates(monthYear, periodLog);
  const pregnancyTestDates = getPregnancyTestDates(periodLog);
  const ovulationDates = getOvulationDates(periodLog);
  const fertileWindows = getFertileWindows(periodLog);
  let calendarObj = {};

  bracketDates.forEach((prd) => {
    calendarObj = {
      ...calendarObj,
      ...getMarkedPeriod(prd, undefined, '#ff7961'),
    };
  });
  pregnancyTestDates.forEach((prd) => {
    calendarObj = {
      ...calendarObj,
      ...getMarkedPeriod(prd, undefined, '#852f58'),
    };
  });
  fertileWindows.forEach((prd) => {
    calendarObj = {
      ...calendarObj,
      ...getMarkedPeriod(prd.start, prd.end, '#56c4c0'),
    };
  });
  ovulationDates.forEach((prd) => {
    calendarObj = {
      ...calendarObj,
      ...getMarkedPeriod(prd, undefined, '#258885'),
    };
  });
  return calendarObj;
};

/**
 * function to append a pair of start and end date to main log
 * @param log DateTypes.Log
 * @param date
 * @param endDate
 * @returns Log
 */
export const appendPeriod = (
  log: DateTypes.Log,
  date: string,
): DateTypes.Log => {
  const temp = { ...log };
  if (detectOverlap(log, date)) {
    return temp;
  }
  log.periods.push(date);
  log.periods.sort((a, b) => (a > b ? 1 : -1));
  const avgCycle = getAvgCycleAndDuration(log);
  temp.avgCycle = avgCycle;
  return temp;
};

/**
 * functon to return average duration and cycle on the basis of log provided
 * @param log DateTypes.Log
 * @return { avgCycle, avgDuration }
 */
export const getAvgCycleAndDuration = (log: DateTypes.Log): number => {
  let avgCycle = 0;
  log.periods.forEach((period, i) => {
    if (i > 0) {
      avgCycle += moment(period).diff(moment(log.periods[i - 1]), 'days');
    }
  });
  if (log.periods.length > 1) {
    avgCycle /= log.periods.length - 1;
  }
  if (avgCycle < 20 || avgCycle > 35) {
    avgCycle = 28;
  }
  return avgCycle;
};

export const detectOverlap = (log: DateTypes.Log, date: string): boolean => {
  let invalid = false;
  const overlap = log.periods.find((period) => date === period);
  if (overlap) {
    invalid = true;
  }
  return invalid;
};

/**
 * function to return starting date and ending date of 1 month before and after given month year
 * @param monthYear
 * @returns { start, end }
 */
export const get3MonthBracketDates = (
  monthYear: DateTypes.MonthYear,
  periodLog: DateTypes.Log,
): string[] => {
  const monthString = `0${monthYear.month}`.slice(-2);
  const m = moment(`${monthYear.year}-${monthString}-01`);
  const start = m.subtract(1, 'months').format('YYYY-MM-DD');
  const end = m.add(3, 'months').subtract(1, 'days').format('YYYY-MM-DD');
  return periodLog.periods.filter((p) => p <= end && p >= start);
};
