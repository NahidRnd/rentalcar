import { useCars } from "./useCars"

function AllCars() {
    const {data, isLoading} = useCars();
    console.log(data);
    
  return (
    <div>
      
    </div>
  )
}

export default AllCars
