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
): DateTypes.Period => {
  if (!startDate) {
    return {};
  }
  if (!endDate) {
    return {
      [startDate]: { color: color || '#50cebb', textColor: 'black' },
    };
  }
  const markObj: DateTypes.Period = {
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
): DateTypes.Period => {
  let calendarObj = {};
  periodLog.periods.forEach((prd) => {
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
  log.periods.push({
    startDate,
    endDate,
  });
  return temp;
};
