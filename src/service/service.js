import axios from "axios";

const BASE_URL = "http://localhost:3000"
const app = axios.create({
    baseURL: BASE_URL
})

export const getCars = async ()=>{    
    const response = await app.get(`/cars`);
    return response.data;
}


export const searchCars = async (query)=>{  
    const response = await app.get(`/cars?name=${query}`);
    return response.data;
}

export const getCapacity = async ()=>{
    const response = await app.get(`/capacity`);
    return response.data;
}

export const getType = async ()=>{
    const response = await app.get(`/type`);
    return response.data;
}

export const getCity = async ()=>{
    const response = await app.get(`/cities`);
    return response.data;
}