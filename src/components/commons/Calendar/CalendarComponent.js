import { Calendar } from 'react-date-range';
import React, {useState} from 'react';
import { getDate } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file

function CalendarComponent (props) {
    const [date, setDate] = useState("");

    const handleSelect = (getDate) => {
        setDate(getDate);
        console.log(getDate); // native Date object   
    }   
    
    return (<Calendar date={date} onChange={handleSelect} /> );   
} 
export default CalendarComponent; 