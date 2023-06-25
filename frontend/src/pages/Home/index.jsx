// hooks
import { useEffect, useState } from "react";

// custom hooks
import { useStateCampaign } from "../../hooks";

// custom components
import { DisplayCampaigns } from '../../components';

// toast
import { toast } from "react-hot-toast";

const Home = () => {
    // fetching states
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    // states campaigns
    const {
        address,
        contract,
        getCampaigns,
    } = useStateCampaign();

    const fetchCampaign = async () => {
        try {
            
            setIsLoading(true);
            const data = await getCampaigns();
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
        if(contract) fetchCampaign();
    }, [contract, address]);

    return (
        <div>
            <DisplayCampaigns
                title="All Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
                isError={isError}
            />
        </div>
    );
};

export default Home;