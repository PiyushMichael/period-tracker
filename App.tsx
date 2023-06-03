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
  const [editDate, setEditDate] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [periodLog, setPeriodLog] = useState<DateTypes.Log>({
    avgCycle: 28,
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
        editDate={editDate}
        setEditDate={setEditDate}
        perdiodLog={periodLog}
        monthYear={monthYear}
        onMonthChange={setMonthYear}
      />
      <Button
        title={editMode ? 'Save' : 'Enter Dates'}
        onPress={() => {
          if (editMode) {
            setEditMode(false);
            editDate && setPeriodLog(appendPeriod(periodLog, editDate));
          } else {
            setEditMode(true);
            setEditDate(undefined);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default App;
