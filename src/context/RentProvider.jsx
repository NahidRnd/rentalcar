import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";

const RentContext = createContext();



function RentProvider({children}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = {
    pickup: {
      location: searchParams.get("pickupCity") || "",
      date: new Date(),
      time: "12:00"
    },
    dropoff: {
      location: searchParams.get("dropoffCity") || "",
      date: new Date(),
      time: "12:00"
    }
  }

  const [state, setState] = useState(initialState);

  return (
    // <RentContext.Provider value={{location, setLocation, startDate , setStartDate, endDate, setEndDate, time, setTime}}>
    <RentContext.Provider value={{state, setState, searchParams, setSearchParams}}>
      {children}
    </RentContext.Provider>
  )
}

export default RentProvider;

export function useRent(){
    return useContext(RentContext)
}
