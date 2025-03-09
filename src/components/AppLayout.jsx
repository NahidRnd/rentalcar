import { Outlet, useSearchParams } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "../ui/Footer"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCars, searchCars } from "../service/service";
import { useCars } from "../cars/useCars";


function AppLayout() {
  const [query, setQuery] = useState("");
  const {data: allCars} = useCars();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = localStorage.getItem('favCar')    
      console.log("storedFav",storedFav);
      
      setFavorites(JSON.parse(storedFav));
      console.log("favorites",favorites);  
  }, []);
  

  const handleAddFav = (car) => { 
    setFavorites((prevFav) => {
      const alreadyExists = prevFav.map((fav)=> fav.id).includes(car.id);
      if(alreadyExists){
        const updatedFavs = prevFav.filter((fav) => fav.id !== car.id);
        localStorage.setItem('favCar', JSON.stringify(updatedFavs));
        console.log("Removed car from favorites:", car);
        return updatedFavs;
      }
      else{
        const newFav = [...prevFav, car];
        console.log("favorites : ", newFav);
        localStorage.setItem('favCar', JSON.stringify(newFav));
        console.log("Added car to favorites:", newFav);
        return newFav;
      }
    });
  }
  const isAddeddToFav = (car) => favorites.map((fav)=> fav.id).includes(car.id);


  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Outlet context={[allCars, query, setQuery, handleAddFav, isAddeddToFav, favorites]} />
      <Footer />
    </>
  )
}

export default AppLayout
