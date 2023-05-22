/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  console.log(periodLog);

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
