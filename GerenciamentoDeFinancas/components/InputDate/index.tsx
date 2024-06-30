import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles } from "./styles";

export default function InputDate() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        if (currentDate >= new Date(1900, 0, 1) && currentDate <= new Date(2100, 0, 1)) {
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const handleWebDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (
            !isNaN(newDate.getTime()) &&
            newDate >= new Date(1900, 0, 1) &&
            newDate <= new Date(2100, 0, 1)
        ) {
            setDate(newDate);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Data</Text>
        {Platform.OS === 'web' ? (
            <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={handleWebDateChange}
            min="1900-01-01"
            max="2100-01-01"
            style={styles.webDatePicker}
            />
        ) : (
            <>
            <Button onPress={showDatepicker} title="Show date picker!" />
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                minimumDate={new Date(1900, 0, 1)}
                maximumDate={new Date(2100, 0, 1)}
                />
            )}
            </>
        )}
        </View>
    );
}