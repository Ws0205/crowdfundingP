// hooks
import { useNavigate } from "react-router-dom";

// custom hooks
import { useStateCampaign } from "../../hooks";

// custom components
import CreateCampaignContent from "./components/CreateCampaignContent";

// toast
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const CreateCampaign = () => {
    // navigate controller
    const navigate = useNavigate();

    // states campaign
    const {
        address,
    } = useStateCampaign();

    useEffect(() => {
        if (!address) {
            toast.error('you must be connected to publish a campaign');
            return navigate('/');
        };

    }, [address]);

    return (
        <div
            className="
            bg-[#1c1c24]
            flex
            justify-center
            items-center
            flex-col
            rounded-[10px]
            sm:p-10
            p-4
            "
        >
            <CreateCampaignContent />
        </div>
    );
}

export default CreateCampaign;