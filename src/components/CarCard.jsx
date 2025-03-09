import { IoHeartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { PiGasPumpFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { PiGearFineFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function CarCard({car, name, type, img, gas, gear, capacity, price, city, onAddFav, isAddeddToFav, favorites}) {  

  const ids = (favorites || []).map(car => car.id);

  return (
    <div className="max-w-xs min-h-388 w-304 rounded-[10px] overflow-hidden bg-white p-32">
      <div className="flex justify-between">
        <div>
            <h3 className="font-bold leading-24 text-xl">{name}</h3>
            <span className="text-text-light">{type}</span>
        </div>
        <div className="group cursor-pointer" onClick={() => onAddFav(car)} >
          {
            
        
              (ids.includes(car.id)) ? (
                <>
                <IoHeartSharp className="text-red-600 text-[28px]" />
                </>
              ) : (
                <>
                <IoHeartOutline className="text-text-light text-[28px] block group-hover:hidden" />
                <IoHeartSharp className="text-red-600 text-[28px] hidden group-hover:block" />
                </>
              )

          
          }
        </div>
      </div>
      <div className="h-200 flex items-center">
        <img className="" src={img} alt="car" />
      </div>
      <ul className="flex justify-between items-center text-text-light *:flex *:items-center *:gap-x-4 *:text-sm">
        <li>
            <PiGasPumpFill className="text-2xl" />
            <span>{gas}</span>
        </li>
        <li>
            <PiGearFineFill className="text-2xl" />
            <span>{gear}</span>
        </li>
        <li>
            <HiUsers className="text-2xl" />
            <span>{capacity}</span>
        </li>
      </ul>
      <div className="flex pt-25 justify-between items-center">
        <div className="flex gap-x-2 font-bold text-[20px] items-center">
            <span>$</span>
            <span>{price}</span>
            <span>/</span>
            <span className="text-text-light text-sm">day</span>
        </div>
        <Link className="btn btn--primary py-10 px-22"  to="/payment" state={car}>Rent Now</Link>
      </div>
    </div>
  )
}

export default CarCard
