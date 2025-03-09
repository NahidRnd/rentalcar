import { Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import bgAds1 from '/img/bg-ads-1.png'
import bgAds2 from '/img/bg-ads-2.png'
import carAds1 from '/img/car-ads-1.png'
import carAds2 from '/img/car-ads-2.png'
import Rent from '../components/Rent'
import CarCard from '../components/CarCard'
import { FaCar } from "react-icons/fa";
import { useEffect, useState } from 'react'


function Home() {

  const [allCars, query, setQuery, handleAddFav, isAddeddToFav, favorites ] = useOutletContext();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("storedUser",storedUser);
  }, []);


  const [visibleCars, setVisibleCars] = useState(8);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleRentCar = (e) => {

    const pickupCityParam = searchParams.get("pickupCity");
    const dropoffCityParam = searchParams.get("dropoffCity");

    let cities = [];
    pickupCityParam && cities.push(pickupCityParam);
    dropoffCityParam && cities.push(dropoffCityParam);

    const cityParams = cities.join(",");
    console.log("cityParams", cityParams);
    navigate(`/cars?city=${cityParams}`);
  }

  const handleMoreCar = () =>{
    setVisibleCars(visibleCars+4);
  }

  if(!allCars) return "error";
  return (
    <div className="bg-bg">
      <div className="container">
        <div className="flex gap-x-30 text-white justify-between">
          <div style={{'--image-url': `url(${bgAds2})`}} className='bg-[image:var(--image-url)] w-640 h-360 p-25'>
            <div className="grid ">
              <div className='max-w-300 col-span-2'>
                <h2 className='text-[32px] font-semibold leading-48 mb-22'>The Best Platform for Car Rental</h2>
                <p className='text-base font-medium leading-24'>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
              </div>
              <div className='mt-28 w-130'>
                <Link to="" className='btn btn--primary'>Rental Car</Link>
              </div>
              <div className='grid-fr1 mt-36'>
                <img src={carAds2} alt="car" className='pr-80 pl-10' />
              </div>
            </div>
          </div>
          <div style={{'--image-url': `url(${bgAds1})`}} className='bg-[image:var(--image-url)] w-640 h-360 p-25'>
            <div className="grid ">
              <div className='max-w-300 col-span-2'>
                <h2 className='text-[32px] font-semibold leading-48 mb-22'>Easy way to rent a car at a low price</h2>
                <p className='text-base font-medium leading-24'>Providing cheap car rental services and safe and comfortable facilities.</p>
              </div>
              <div className='mt-28 w-130'>
                <Link to="" className='btn btn--information'>Rental Car</Link>
              </div>
              <div className='grid-fr1 mt-36'>
                <img src={carAds1} alt="car" className='pr-80 pl-10' />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-40">
          <Rent value="pickup" label="Pick - Up" />
          <button className='btn btn--primary m-auto px-16 py-10 h-60 w-60 rounded-[10px] cursor-pointer' onClick={handleRentCar}>
            <FaCar className='w-24 h-24' />
          </button>
          <Rent value="dropoff" label="Drop - Off" />
        </div>
        <div className="">
          <div className="flex justify-between px-20 py-30 font-semibold leading-20">
            <p className='text-text-light'>Popular Car</p>
            <Link className='text-primary' to="/cars">View All</Link>
          </div>
          <div className="flex justify-between">
            {
              allCars.slice(0,4).map((car, index)=>{
                return <CarCard favorites={favorites} isAddeddToFav={isAddeddToFav} onAddFav={handleAddFav} key={index} car={car} name={car.name} type={car.type} img={car.img} gas={car.gas} gear={car.gear} capacity={car.capacity} price={car.price} city={car.city} />;
              })
            }
          </div>
        </div>
        <div className="">
          <div className="flex justify-between px-20 pb-30 pt-50 font-semibold leading-20">
            <p className='text-text-light'>Recomendation Car</p>
          </div>
          {
            <div className="grid grid-cols-4 justify-between gap-x-40 gap-y-40 pb-30">
            {
              allCars.slice(0,visibleCars).map((car, index)=>{
                return <CarCard favorites={favorites} isAddeddToFav={isAddeddToFav} onAddFav={handleAddFav} key={index} car={car} name={car.name} type={car.type} img={car.img} gas={car.gas} gear={car.gear} capacity={car.capacity} price={car.price} city={car.city} />;
              })
            }
            </div>
          }
        </div>
        <div className="flex justify-center pt-50">
          <Link className='btn btn--primary' onClick={handleMoreCar} >Show More Cars</Link>
          {/* <span className="text-text-light">120 cars</span> */}
        </div>
      </div>
    </div>
  )
}

export default Home
