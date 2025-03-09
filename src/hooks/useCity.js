import { useQuery } from "react-query";
import { getCity } from "../service/service";

export function useCity(){
    return useQuery({
        queryKey: ["city"],
        queryFn: getCity
    })
}