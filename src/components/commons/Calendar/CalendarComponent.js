import { DateRange } from 'react-date-range';
import React, {useState} from 'react';
import { getDate } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file

function CalendarComponent (props) {
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      });
    
      const formatDate = (fdate) => {
        let month = '' + (fdate.getMonth() + 1);
        let day = '' + fdate.getDate();
        let year = fdate.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
      }
    
      const onRangeChange = (ranges) => {
        console.log(ranges);
    
        props.setDate({
            startDate: ranges['selection'].startDate,
            endDate: ranges['selection'].endDate,
            key: ranges['selection'].key,
        })
    
        if(ranges['selection'].endDate !== ranges['selection'].startDate){
          props.setIsCalendar(false);
        }
      }
      
    return (<DateRange 
        ranges={[props.date]}
        onChange={onRangeChange} 
        moveRangeOnFirstSelection={false}
        editableDateInputs={true}
    /> );   
} 
export default CalendarComponent; 