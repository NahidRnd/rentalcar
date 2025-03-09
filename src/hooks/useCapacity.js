import { useQuery } from "react-query";
import { getCapacity } from "../service/service";

export function useCapacity(){
    return useQuery({
        queryKey: ["capacity"],
        queryFn: getCapacity
    })
}