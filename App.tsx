/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Calendar from 'components/Calendar';
import { appendPeriod } from 'utilities/calendarHelpers';

function App(): JSX.Element {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [periodLog, setPeriodLog] = useState<DateTypes.Log>({
    avgCycle: 28,
    avgDuration: 5,
    periods: [],
  });
  const [monthYear, setMonthYear] = useState<DateTypes.MonthYear>({
    month: +moment().format('M'),
    year: +moment().format('Y'),
  });

  useEffect(() => {
    AsyncStorage.getItem('name');
  }, []);

  return (
    <SafeAreaView>
      <Calendar
        editMode={editMode}
        selectionStartDate={startDate}
        selectionEndDate={endDate}
        setSelectionStartDate={setStartDate}
        setSelectionEndDate={setEndDate}
        perdiodLog={periodLog}
        monthYear={monthYear}
        onMonthChange={setMonthYear}
      />
      <Button
        title={editMode ? 'Save' : 'Enter Dates'}
        onPress={() => {
          if (editMode) {
            setEditMode(false);
            startDate &&
              setPeriodLog(appendPeriod(periodLog, startDate, endDate));
          } else {
            setEditMode(true);
            setStartDate(undefined);
            setEndDate(undefined);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default App;
