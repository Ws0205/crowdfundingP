// assets
import { useEffect, useState } from "react";
import { search } from "../../assets";
import { useDebounce } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
    const navigate = useNavigate();

    // states searches
    const [searchInput, setSearchInput] = useState('');
    const debouncedValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debouncedValue) return;

        const queryParams = new URLSearchParams();

        queryParams.set('q', debouncedValue);

        navigate({
            pathname: '/search',
            search: queryParams.toString(),
        });
    },[debouncedValue]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();

        queryParams.set('q', searchInput);

        navigate({
            pathname: '/search',
            search: queryParams.toString(),
        });
    } 

    return (
        <form className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]" onSubmit={handleSubmit}>
            <input
                type="text" placeholder="Search for campaigns"
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
            </button>
        </form>
    );
}

export default Searchbar;