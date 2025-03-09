import { useQuery } from "react-query";
import { getType } from "../service/service";

export function useType(){
    return useQuery({
        queryKey: ["cars"],
        queryFn: getType
    })
}