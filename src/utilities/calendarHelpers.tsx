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
): DateTypes.CalendarPeriod => {
  if (!startDate) {
    return {};
  }
  if (!endDate) {
    return {
      [startDate]: { color: color || '#50cebb', textColor: 'black' },
    };
  }
  const markObj: DateTypes.CalendarPeriod = {
    [startDate]: {
      startingDay: true,
      color: color || '#50cebb',
      textColor: 'black',
    },
    [endDate]: {
      endingDay: true,
      color: color || '#50cebb',
      textColor: 'black',
    },
  };
  let dt = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
  while (dt !== endDate) {
    markObj[dt] = {
      color: color || '#50cebb',
      textColor: 'black',
    };
    dt = moment(dt).add(1, 'days').format('YYYY-MM-DD');
  }
  return markObj;
};

/**
 * function to return marked periods on calendar
 * @param datd
 * @returns MarkedDate
 */
export const getMarkedDate = (
  date: string,
): {
  [key: string]: {
    selected?: boolean;
    marked?: boolean;
    disableTouchEvent?: boolean;
    selectedColor: string;
    dotColor: string;
  };
} => {
  return {
    [date]: {
      selected: true,
      marked: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
      dotColor: 'black',
    },
  };
};

export const getPeriodCalendar = (
  periodLog: DateTypes.Log,
  monthYear: DateTypes.MonthYear,
): DateTypes.CalendarPeriod => {
  const bracket = get3MonthBracket(monthYear);
  let calendarObj = {};
  periodLog.periods
    .filter(
      (p) =>
        p.startDate <= bracket.end &&
        (p.endDate || p.startDate) >= bracket.start,
    )
    .forEach((prd) => {
      calendarObj = {
        ...calendarObj,
        ...getMarkedPeriod(prd.startDate, prd.endDate, '#ff7961'),
      };
    });
  return calendarObj;
};

/**
 * function to append a pair of start and end date to main log
 * @param log DateTypes.Log
 * @param startDate
 * @param endDate
 * @returns Log
 */
export const appendPeriod = (
  log: DateTypes.Log,
  startDate: string,
  endDate?: string,
): DateTypes.Log => {
  const temp = { ...log };
  if (detectOverlap(log, startDate, endDate)) {
    return temp;
  }
  log.periods.push({
    startDate,
    endDate,
  });
  log.periods.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
  const { avgCycle, avgDuration } = getAvgCycleAndDuration(log);
  temp.avgCycle = avgCycle;
  temp.avgDuration = avgDuration;
  return temp;
};

/**
 * functon to return average duration and cycle on the basis of log provided
 * @param log DateTypes.Log
 * @return { avgCycle, avgDuration }
 */
export const getAvgCycleAndDuration = (
  log: DateTypes.Log,
): { avgCycle: number; avgDuration: number } => {
  let avgCycle = 0;
  let avgDuration = 0;
  log.periods.forEach((period, i) => {
    if (i > 0) {
      avgCycle += moment(period.startDate).diff(
        moment(log.periods[i - 1].startDate),
        'days',
      );
    }
    avgDuration += moment(period.endDate).diff(
      moment(period.startDate),
      'days',
    );
  });
  if (log.periods.length) {
    avgDuration /= log.periods.length;
  }
  if (log.periods.length > 1) {
    avgCycle /= log.periods.length - 1;
  }
  if (avgCycle < 20 || avgCycle > 35) {
    avgCycle = 28;
  }
  return { avgCycle, avgDuration };
};

export const detectOverlap = (
  log: DateTypes.Log,
  startDate: string,
  endData?: string,
): boolean => {
  let invalid = false;
  const overlap = log.periods.find(
    (period) =>
      (startDate >= period.startDate &&
        period.endDate &&
        startDate <= period.endDate) ||
      (endData &&
        endData >= period.startDate &&
        period.endDate &&
        endData <= period.endDate) ||
      (endData &&
        startDate <= period.startDate &&
        period.endDate &&
        endData >= period.endDate),
  );
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
export const get3MonthBracket = (
  monthYear: DateTypes.MonthYear,
): { start: string; end: string } => {
  const monthString = `0${monthYear.month}`.slice(-2);
  const m = moment(`${monthYear.year}-${monthString}-01`);
  return {
    start: m.subtract(1, 'months').format('YYYY-MM-DD'),
    end: m.add(3, 'months').subtract(1, 'days').format('YYYY-MM-DD'),
  };
};
