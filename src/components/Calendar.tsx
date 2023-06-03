import React from 'react';
import { Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getMarkedPeriod, getPeriodCalendar } from 'utilities/calendarHelpers';

const CalendarSleeve = ({
  editMode,
  editDate: editDate,
  setEditDate: setEditDate,
  perdiodLog,
  monthYear,
  onMonthChange,
}: {
  editMode: boolean;
  editDate?: string;
  setEditDate?: (val?: string) => void;
  perdiodLog: DateTypes.Log;
  monthYear: DateTypes.MonthYear;
  onMonthChange: (val: DateTypes.MonthYear) => void;
}) => (
  <Calendar
    onDayPress={(day) => {
      if (editMode) {
        setEditDate && setEditDate(day.dateString);
      }
    }}
    onDayLongPress={(day) => {
      Alert.alert('Delete this date?', `Delete ${day.dateString}?`, [
        { text: 'ok', onPress: () => console.log('pressed') },
        { text: 'cancel' },
      ]);
    }}
    onMonthChange={(m) => onMonthChange({ month: m.month, year: m.year })}
    markingType="period"
    markedDates={
      editMode
        ? getMarkedPeriod(editDate)
        : getPeriodCalendar(perdiodLog, monthYear)
    }
  />
);

export default CalendarSleeve;
