import search from '/img/search.svg';
import filter from '/img/filter.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Search({query, setQuery}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("search") || query;
  
  const navigate = useNavigate();
  
  const handleSearch = () =>{  

    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", query);
    setSearchParams(newParams);

    navigate(`/cars?${newParams.toString()}`, { state: { search: query } });

  }

  const handleFilter = () => {
    navigate("/cars", {state: {search: ""}})
  }
  
  return (
    <div className='flex border border-border rounded-full px-18 py-10 w-490 items-center justify-between'>
      <button onClick={handleSearch}>
        <img src={search} />
      </button>
      <input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       type="text" name="search" id="search" placeholder='Search here' className='pl-15 flex-grow-1' />
      <button onClick={handleFilter}>
        <img src={filter} />
      </button>
    </div>
  )
}

export default Search
