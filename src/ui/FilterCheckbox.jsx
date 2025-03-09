import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";


function FilterCheckbox({inputValues =[], filterField}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isChecked, setIsChecked] = useState(()=>{
      const params = new URLSearchParams(window.location.search);
      // console.log("params",params);
      const values = params.get(filterField)?.split(',') || [];
      return inputValues.reduce((acc, inputValue) => {
        acc[inputValue.name] = values.includes(inputValue.name);
        return acc;
      }, {});
    });
    
    let values = searchParams.get(filterField)?.split(',') || [];

    const changeFilter = (e) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        setIsChecked(prev => ({ ...prev, [value]: checked }));      

        if(checked){
            values.push(value);
        } 
        else{
            values = values.filter(v => v !== value);
        } 
        if (values.length > 0) {
          searchParams.set(filterField, values.join(","));
        } else {
          searchParams.delete(filterField);
        }
    
        setSearchParams(searchParams);     
    }
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const values = params.get(filterField)?.split(',') || [];
      setIsChecked(
        inputValues.reduce((acc, inputValue) => {
          acc[inputValue.name] = values.includes(inputValue.name);
          return acc;
        }, {})
      );
    }, [inputValues, filterField]);


    return (
        <>
        {inputValues && inputValues.map((inputValue)=>{
            return (
            <div key={inputValue.id} className="flex items-center mb-15 gap-x-10">
              <input onChange={changeFilter} id={inputValue.id} type="checkbox" value={inputValue.name} checked={!!isChecked[inputValue.name]} className="w-22 h-22 text-primary bg-text-light border-text-light rounded-xl" />
              <label htmlFor={inputValue.name} className="ms-2 text-lg font-medium text-dark-gr">{inputValue.name}</label>
            </div>
            )
          })}
        </>
      )
}

export default FilterCheckbox
