import { useCity } from "../hooks/useCity"
import SelectBox from "../ui/SelectBox"
import { useRent } from "../context/RentProvider";
import { useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Rent({value, label}) {

  const {state, setState, searchParams, setSearchParams} = useRent();
  // const {location, setLocation, startDate , setStartDate, endDate, setEndDate, time, setTime} = useRent();
  const[openDate, setOpenDate] = useState(false);

  const {data:cities} = useCity();
  
  const handleLocationChange = (e) => { 
    const updatedState = {
      ...state,
      [value]: {...state[value], location: e.target.value },
    };
    setState(updatedState);
    const newParams = new URLSearchParams(searchParams);
    newParams.set(`${value}City`, e.target.value);
    setSearchParams(newParams);
  }

  const handleDateChange = (date) => {
    const updatedState = {
    ...state,
    [value]: {...state[value], date},
    }
    setState(updatedState);
    setOpenDate(false);
  };

  const handleTimeChange = (e) => {
    const updatedState = {
      ...state,
      [value]: {...state[value], time: e.target.value },
    };
    setState(updatedState);
  }

  //timer 
  const timeOptions = generateTimeOptions();

  return (
    <div className="grid grid-rows-2 max-w-580 bg-white py-30 px-50 rounded-[10px] grow" >
      <div>
        <label className="font-semibold" htmlFor={value}>{label}</label>
      </div>
      <div className="grid grid-cols-3 divide-x-3 divide-solid divide-border justify-between">
        <div className="px-15 pl-0">
          <SelectBox value={state[value].location || "no city"} onChange={(e) => handleLocationChange(e)} name="city" label="Locations" options={cities}  />
        </div>
        <div className="px-15 relative">
          <label className="font-bold" htmlFor="date">Date</label>
          <input className="text-text-light relative" type="date" name="date" id="date" onClick={()=> setOpenDate(!openDate)} value={state[value].date ? format(state[value].date, "yyyy-MM-dd") : ""} onChange={(e) => handleDateChange(new Date(e.target.value))} />
          {openDate && 
          <div className="absolute">
            <Calendar date={state[value].date} onChange={date => handleDateChange(date)} 
            minDate={(value === "pickup") ? new Date() : state.pickup.date} moveRangeOnFirstSelection={true} />
          </div>  
          }
        </div>
        <div className="px-15 pr-0">
          <SelectBox value={state[value].time} name="time" label="Time" options={timeOptions} onChange={handleTimeChange} />
        </div>
      </div>
    </div>
  )
}

export default Rent

//timer 
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0');
    times.push({ name: `${hourString}:00` });
  }
  return times;
};
