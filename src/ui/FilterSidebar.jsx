import { useCapacity } from "../hooks/useCapacity";
import { useType } from "../hooks/useType";
import FilterCheckbox from "./FilterCheckbox";


function FilterSidebar({}) {
  const {data:capacity} = useCapacity();
  const {data:types} = useType();

  return (
    <div>
      <div>
        <h3 className="text-text-light py-20 text-sm">TYPE</h3>
        <FilterCheckbox inputValues={types} filterField="type" />
      </div>
      <div>
        <h3 className="text-text-light py-20 text-sm">CAPACITY</h3>
        <FilterCheckbox inputValues={capacity} filterField="capacity" />
        {/* { capacity && capacity.map((cap)=>{
          return <Checkbox key={cap.id} value="type" label={cap.name} />
        })} */}
      </div>
      <div></div>
      {/* <button onClick={changeFilter}>filter</button> */}
    </div>
  )
}

export default FilterSidebar
