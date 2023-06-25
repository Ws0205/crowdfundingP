// hooks
import { useEffect, useState } from "react";

// custom hooks
import { useStateCampaign } from "../../hooks";

// custom components
import { DisplayCampaigns } from '../../components';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    // controller navigate
    const navigate = useNavigate();

    // fetching states
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    // states campaigns
    const {
        address,
        contract,
        getUserCampaigns,
    } = useStateCampaign();

    const fetchCampaign = async () => {
        try {

            setIsLoading(true);
            const data = await getUserCampaigns();
            setCampaigns(data);

        } catch (error) {
            setIsError(true);
            setCampaigns([]);
            toast('something went wrong on our system');

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!address) {
            toast.error('you must be connected to see a profile');
            return navigate('/');
        }
        if (contract) fetchCampaign();
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

export default Profile;