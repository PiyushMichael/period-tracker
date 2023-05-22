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
}: {
  editMode: boolean;
  selectionStartDate?: string;
  selectionEndDate?: string;
  setSelectionStartDate?: (val?: string) => void;
  setSelectionEndDate?: (val?: string) => void;
  perdiodLog: DateTypes.Log;
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
    onMonthChange={(month) => {
      console.log('selected month', month);
    }}
    markingType="period"
    markedDates={
      editMode
        ? getMarkedPeriod(selectionStartDate, selectionEndDate)
        : getPeriodCalendar(perdiodLog)
    }
  />
);

export default CalendarSleeve;
