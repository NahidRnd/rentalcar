import { useQuery } from "react-query";
import { getCars } from "../service/service";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export function useCars(){

    const {search} = useLocation();
    const queryObject = queryString.parse(search);      

    return useQuery({
        queryKey: ["cars", queryObject],
        queryFn: () => getCars(search)
    })
}