import { Link, useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import Rent from "../components/Rent";
import FilterSidebar from "../ui/FilterSidebar";
import { useType } from "../hooks/useType";
import { useCapacity } from "../hooks/useCapacity";
import { useCity } from "../hooks/useCity";
import { useState } from "react";
import { FaCar } from "react-icons/fa";



function Cars() {
  
  const location = useLocation();
  const urlParams = location.search || "";
  const {data:defaultTypes = []} = useType();
  const {data:defaultCaps = []} = useCapacity();
  const {data:defaultcity = []} = useCity();
  const [allCars, query, setQuery, handleAddFav, isAddeddToFav ] = useOutletContext();
  const [visibleCars, setVisibleCars] = useState(6);
  

  // const searchParams = new URLSearchParams(urlParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const typesString = searchParams.get('type');
  const types = typesString ? typesString.split(',') : defaultTypes.map(type => type.name);
  const capsString = searchParams.get('capacity');
  const caps = capsString ? capsString.split(',') : defaultCaps.map(capacity => capacity.name);
  const cityString = searchParams.get('city');
  const cities = cityString ? cityString.split(',') : defaultcity.map(city => city.name);
  const navigate = useNavigate();
  
  const filteredCarscity = allCars && allCars.filter(car => cities.includes(car.city));
  const filteredCarsType = filteredCarscity && filteredCarscity.filter(car => types.includes(car.type));
  const filteredCarsCap = filteredCarsType && filteredCarsType.filter(car => caps.includes(car.capacity));
  const filteredCars = filteredCarsCap && filteredCarsCap.filter(car => !search || car.name.toLowerCase().includes(search.toLocaleLowerCase()));

  const len = (filteredCars) ? filteredCars.length : "0";

  const handleMoreCar = () =>{
    setVisibleCars(visibleCars+3);
  }

  const handleRentCar = (e) => {

    const pickupCityParam = searchParams.get("pickupCity");
    const dropoffCityParam = searchParams.get("dropoffCity");

    let cities = [];
    pickupCityParam && cities.push(pickupCityParam);
    dropoffCityParam && cities.push(dropoffCityParam);

    const cityParams = cities.join(",");
    console.log("cityParams", cityParams);
    searchParams.set("city", cityParams);
    searchParams.delete("pickupCity");
    searchParams.delete("dropoffCity");
    setSearchParams(searchParams);
  }

  return (
    <div className="bg-bg flex">
      <div className="bg-white">
        <div className="*:w-310 pl-100 text-red-600">
          <FilterSidebar />
        </div>
      </div>
      <div className="grow">  
        <div className="container-inside">
          <div className="flex gap-x-40 justify-between relative *:py-20 *:px-25">
            <Rent value="pickup" label="Pick - Up" />
            <button className='btn btn--primary m-auto px-16 py-10 h-60 w-60 rounded-[10px] cursor-pointer' onClick={handleRentCar}>
              <FaCar className='w-24 h-24' />
            </button>
            <Rent value="dropoff" label="Drop - Off" />
          </div>
          <p className="pt-40 pb-20">Results: {len} cars found</p>
          <div className="grid grid-cols-3 gap-y-20 *:w-450 gap-x-40">
            {
              filteredCars && filteredCars.slice(0,visibleCars).map((car, index)=>{
                return <CarCard isAddeddToFav={isAddeddToFav(car)} onAddFav={handleAddFav} key={index} car={car} name={car.name} type={car.type} img={car.img} gas={car.gas} gear={car.gear} capacity={car.capacity} price={car.price} city={car.city} />;
                // return <CarCard key={index} car={car} name={car.name} type={car.type} img={car.img} gas={car.gas} gear={car.gear} capacity={car.capacity} price={car.price} city={car.city} />;
              })
            }
          </div>
          <div className="flex justify-center pt-50">
          {
            len>0 && <Link className='btn btn--primary' onClick={handleMoreCar} >Show More Cars</Link>
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cars
