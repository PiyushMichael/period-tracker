import React from 'react';
import { Calendar } from 'react-native-calendars';
import { getMarkedPeriod, getPeriodCalendar } from 'utilities/calendarHelpers';

const CalendarSleeve = ({
  editMode,
  selectionStartDate,
  selectionEndDate,
  setSelectionStartDate,
  setSelectionEndDate,
  perdiodLog,
  monthYear,
  onMonthChange,
}: {
  editMode: boolean;
  selectionStartDate?: string;
  selectionEndDate?: string;
  setSelectionStartDate?: (val?: string) => void;
  setSelectionEndDate?: (val?: string) => void;
  perdiodLog: DateTypes.Log;
  monthYear: DateTypes.MonthYear;
  onMonthChange: (val: DateTypes.MonthYear) => void;
}) => (
  <Calendar
    onDayPress={(day) => {
      if (editMode) {
        if (selectionStartDate && day.dateString > selectionStartDate) {
          setSelectionEndDate && setSelectionEndDate(day.dateString);
        } else {
          setSelectionStartDate && setSelectionStartDate(day.dateString);
        }
      }
    }}
    onMonthChange={(m) => onMonthChange({ month: m.month, year: m.year })}
    markingType="period"
    markedDates={
      editMode
        ? getMarkedPeriod(selectionStartDate, selectionEndDate)
        : getPeriodCalendar(perdiodLog, monthYear)
    }
  />
);

export default CalendarSleeve;
