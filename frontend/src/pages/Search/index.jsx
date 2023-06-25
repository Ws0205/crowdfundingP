// hooks
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// custom hooks
import {
    useStateCampaign
} from '../../hooks';

// custom component
import {
    DisplayCampaigns
} from '../../components';

import { toast } from 'react-hot-toast';
import { search } from '../../assets';

const Search = () => {
    // location controller
    const location = useLocation();
    
    // fetching states
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [searchedValue, setSearchedValue] = useState();

    // states campaigns
    const {
        address,
        contract,
        getSearchedCampaigns,
    } = useStateCampaign();
    
    
    const fetchCampaign = async () => {
        try {
            setIsLoading(true);
            console.log(searchedValue);
            const data = await getSearchedCampaigns(searchedValue);
            setCampaigns(data);
            
        } catch (error) {
            setIsError(true);
            setCampaigns([]);
            toast.error('something went wrong on our system');
            
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        
        setSearchedValue(searchParams.get("q"));

        if(contract) fetchCampaign();
    }, [contract, address, location.search]);
    
    return (
        <div>
             <DisplayCampaigns
                 title={`Search Campaigns with ${searchedValue}`}
                 isLoading={isLoading}
                 campaigns={campaigns}
                 isError={isError}
             />
    </div> 
    );
}

export default Search;