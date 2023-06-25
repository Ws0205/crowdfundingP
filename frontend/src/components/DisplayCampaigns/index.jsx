// hooks
import { useNavigate } from "react-router-dom";

// custom components
import { FundCard } from '../';

// assets
import { loader } from "../../assets";

const DisplayCampaigns = ({
    title = '',
    isLoading,
    campaigns = [],
    isError,
}) => {

    // navigate controller
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {
            state: campaign,
        });
    }

    return (
        <div
            className=""
        >
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                {title} ({campaigns.length})
            </h1>
            <div
                className="flex flex-wrap mt-[20px] gap-[26px]"
            >
                {
                    isLoading && (
                        <img
                            src={loader}
                            atl="loader"
                            className="
                            w-[100px]
                            h-[100px]
                            object-contain
                            "
                        />
                    )
                }
                {
                    !isLoading && isError && (
                        <p
                            className="
                            font-epilogue
                            font-semibold
                            text-[14px]
                            leading-[30px]
                            text-[#818183]
                            "
                        >
                            Could not find any campany due to an internal error try again later
                        </p>
                    )
                }
                {
                    !isLoading && !isError && campaigns.length === 0 && (
                        <p
                            className="
                            font-epilogue
                            font-semibold
                            text-[14px]
                            leading-[30px]
                            text-[#818183]
                            "
                        >
                            You have not created any campaigns yet
                        </p>
                    )
                }
                
                {
                    !isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
                        <FundCard
                            key={campaign.pId}
                            {...campaign}
                            handleClick={() => handleNavigate(campaign)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default DisplayCampaigns;