import { useEffect, useState } from "react";
import { useRent } from "../context/RentProvider";
import { useCity } from "../hooks/useCity";
import PaymentBox from "../ui/PaymentBox";
import SelectBox from "../ui/SelectBox";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import Accordion from "../ui/Accordion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../ui/Modal";


function PaymentRentCar() {

    const {state, setState, searchParams, setSearchParams} = useRent();

    const {data:cities = []} = useCity();
    const[openPickupDate, setOpenPickupDate] = useState(false);
    const[openDropoffDate, setOpenDropoffDate] = useState(false);
    const carState = useLocation();
    const car = carState.state;

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        dropoffLocation: '',
        dropoffDate: '',
        dropoffTime: '',
        cardNum: '',
        expDate: '',
        bill: '',
        cvv: '',
        email: '',
        password: '',
        bitcoinAddr: '',
        amount: '',
        optMsg: '',
        car: car,
    });
    
    const tax = 0;
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        // const newParams = new URLSearchParams(searchParams);
        // newParams.set(name, value);
        // setSearchParams(newParams);
        console.log("Updated formData:", updatedFormData);
        
    };
    
    const handleLocationChange = (e, type) => { 
        const updatedState = {
          ...state,
          [type]: {...state[type], location: e.target.value },
        };
        setState(updatedState);
        const newParams = new URLSearchParams(searchParams);
        newParams.set(`${type}City`, e.target.value);
        setSearchParams(newParams);
        console.log("location:", state.pickup.location);
    }
    const handleDateChange = (date, type) => {
    const updatedState = {
    ...state,
    [type]: {...state[type], date},
    }
    setState(updatedState);
    setOpenPickupDate(false);
    setOpenDropoffDate(false);
    };

    const handleTimeChange = (e, type) => {
    const updatedState = {
        ...state,
        [type]: {...state[type], time: e.target.value },
    };
    setState(updatedState);
    }
    
    //timer 
    const timeOptions = generateTimeOptions();


    const handleRent = (e) => {
        console.log("Clicked / State : ", formData);
        e.preventDefault();
        axios.post('http://localhost:3000/rentCar', formData)
          .then(response => {
            console.log('formData added:', response.data);
            setOpen(true);
            
            // Optionally reset form
            // setCar({ make: '', model: '', year: '' });
          })
          .catch(error => {
            console.error(error);
          });
    }
    
      
    
  return (
    <div className="bg-bg">
      <div className="container grid gap-x-40 grid-cols-8">
        <div className="flex flex-col gap-y-32 col-span-5">
            <PaymentBox title="Biling Info" subtitle="Please enter your billing info" step="Step 1 of 4" >
                <div className="grid grid-cols-2 grid-rows-2 gap-20">
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="p-input" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone" className="p-input" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" className="p-input" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="city">Town / City</label>
                        <input type="text" name="city" id="city" className="p-input" value={formData.city} onChange={handleChange} />
                    </div>
                </div>
            </PaymentBox>
            <PaymentBox title="Rental Info" subtitle="Please select your rental date" step="Step 2 of 4" >
                <div className="pb-8 font-semibold">
                    Pick - Up
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-20">
                    <div className="flex flex-col">
                        <SelectBox style="p-input" value={state.pickup.location} onChange={(e) => handleLocationChange(e , 'pickup')} name="pickupLocation" label="Location" options={cities} />
                    </div>
                    <div className="flex flex-col px-15 relative">
                        <label className="font-bold" htmlFor="pickupDate">Date</label>
                        <input className="p-input relative" type="date" name="pickupDate" id="pickupDate" onClick={()=> setOpenPickupDate(!openPickupDate)} 
                                value={state.pickup.date ? format(state.pickup.date, "yyyy-MM-dd") : ""} 
                                onChange={(e) => handleDateChange(new Date(e.target.value), 'pickup')} />
                        {openPickupDate && 
                        <div className="absolute pt-70 z-9">
                            <Calendar date={state.pickup.date} onChange={date => handleDateChange(date, 'pickup')} minDate={new Date()} moveRangeOnFirstSelection={true} />
                        </div>  
                        }
                    </div>
                    <div className="flex flex-col">
                        <SelectBox style="p-input" value={state.pickup.time} onChange={(e) => handleTimeChange(e, 'pickup')} name="pickupTime" label="Time" options={timeOptions}  />
                    </div>
                </div>
                <div className="pb-8 pt-32 font-semibold">
                    Drop - Off
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-20">
                    <div className="flex flex-col">
                        <SelectBox style="p-input" value={state.dropoff.location} onChange={(e) => handleLocationChange(e , 'dropoff')} name="dropoffLocation" label="Location" options={cities} />
                    </div>
                    <div className="flex flex-col px-15 relative">
                        <label className="font-bold" htmlFor="dropoffDate">Date</label>
                        <input className="p-input relative" type="date" name="dropoffDate" id="dropoffDate" onClick={()=> setOpenDropoffDate(!openDropoffDate)} 
                                value={state.dropoff.date ? format(state.dropoff.date, "yyyy-MM-dd") : ""} onChange={(e) => handleDateChange(new Date(e.target.value), 'dropoff')} />
                        {openDropoffDate && 
                        <div className="absolute pt-70">
                            <Calendar date={state.dropoff.date} onChange={date => handleDateChange(date, 'dropoff')} minDate={state.pickup.date} moveRangeOnFirstSelection={true} />
                        </div>  
                        }
                    </div>
                    <div className="flex flex-col">
                        <SelectBox style="p-input" value={state.dropoff.time} onChange={(e) => handleTimeChange(e, 'dropoff')} name="dropoffTime" label="Time" options={timeOptions}  />
                    </div>
                </div>
            </PaymentBox>
            <PaymentBox title="Payment Method" subtitle="Please enter your payment method" step="Step 3 of 4" >
                <div className="flex flex-col gap-y-32">
                    <Accordion title="Credit Card" icon="/img/Visa.svg" defaultOpen="true" >
                    <div className="grid grid-cols-2 grid-rows-2 gap-20">
                        <div className="flex flex-col">
                            <label htmlFor="cardNum">Card Number</label>
                            <input type="text" name="cardNum" id="cardNum" className="p-input bg-white" value={formData.cardNum} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="expDate">Expiration Date</label>
                            <input type="text" name="expDate" id="expDate" className="p-input bg-white" value={formData.expDate} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="bill">Billing bill</label>
                            <input type="text" name="bill" id="bill" className="p-input bg-white" value={formData.bill} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" name="cvv" id="cvv" className="p-input bg-white" value={formData.cvv} onChange={handleChange} />
                        </div>
                    </div>
                    </Accordion>
                    <Accordion title="PayPal" icon="/img/PayPal.svg">
                    <div className="grid grid-cols-2 grid-rows-1 gap-20">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="p-input bg-white" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" id="password" className="p-input bg-white" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>
                    </Accordion>
                    <Accordion title="Bitcoin" icon="/img/Bitcoin.svg">
                    <div className="grid grid-cols-2 grid-rows-2 gap-20">
                        <div className="flex flex-col">
                            <label htmlFor="bitcoinAddr">Bitcoin Address</label>
                            <input type="text" name="bitcoinAddr" id="bitcoinAddr" className="p-input bg-white" value={formData.bitcoinAddr} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" name="amount" id="amount" className="p-input bg-white" value={formData.amount} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="optMsg">Optional Message</label>
                            <input type="text" name="optMsg" id="optMsg" className="p-input bg-white" value={formData.optMsg} onChange={handleChange} />
                        </div>
                    </div>
                    </Accordion>
                </div>
            </PaymentBox>
            <PaymentBox title="Confirmation" subtitle="We are getting to the end. Just few clicks and your rental is ready!" step="Step 4 of 4" >
            <div className="flex flex-col gap-y-20">
                <label className="p-checkbox">
                    <input type="checkbox" name="agreement" id="agreement" />
                    I agree with sending marketing and newsletter emails.
                </label>
                <label className="p-checkbox">
                    <input type="checkbox" name="privacy" id="privacy" />
                    I agree with our terms and conditions and privacy policy.
                </label>
            </div>
            <Modal title="Information Sent" open={open} onClose={()=>setOpen(false)}>
                <p>
                    Your Informarion sent and needs to be confirmed by admin
                </p>
                <button className="btn btn--primary mt-20 w-full" onClick={()=>setOpen(false)}>Ok</button>
            </Modal>
            <button className="btn btn--primary rounded-[10px] my-20" onClick={handleRent}>Rent Now</button>
            <img src="/img/security.svg" alt="security" />
            <h3 className="font-bold pt-20">All your data are safe</h3>
            <p className="text-text-light text-sm">We are using the most advanced security to provide you the best experience ever.</p>
            </PaymentBox>
        </div>
        <div className="col-span-3">
            <PaymentBox title="Rental Summary" subtitle="Prices may change depending on the length of the rental and the price of your rental car.">
                <div className="flex items-center gap-x-20 border-b border-b-border pb-20">
                    <div className="flex bg-primary w-132 h-108 rounded-lg">
                        <img className="w-128 h-auto object-contain m-auto" src={car.img} alt={car.name} />
                    </div>
                    <div className="">
                        <h2 className="font-bold text-3xl">{car.name}</h2>
                        <span className="text-secondary">Type : {car.type}</span>
                    </div>
                </div>
                <div className="grid grid-cols-[2fr, min] gap-y-20 pt-20">
                    <div className="text-text-light">
                        Subtotal
                    </div>
                    <div className="text-right">
                        ${car.price}
                    </div>
                    <div className="text-text-light">
                        Tax
                    </div>
                    <div className="text-right">
                        ${tax}
                    </div>
                    <div className="col-span-2 flex bg-bg py-20 px-40 justify-between rounded-[10px] my-10">
                        <input type="text" name="promo" id="promo" placeholder="Apply promo code" />
                        <button className="text-right font-medium">Apply Now</button>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Total Rental Price</p>
                        <span className="text-text-light text-sm">Overall price includes discount</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-3xl text-right">
                            ${parseFloat(car.price)+parseFloat(tax)}
                        </h3>
                    </div>
                </div>
            </PaymentBox>
        </div>
      </div>
    </div>
  )
}

export default PaymentRentCar

//timer 
const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, '0');
      times.push({ name: `${hourString}:00` });
    }
    return times;
  };