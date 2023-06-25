// hooks
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// custom hooks
import { useStateCampaign } from "../../hooks";

// custom components
import { CustomButton, CountBox, Loader } from "../../components";

// ethers
import { ethers } from "ethers";

// assets
import { thirdweb } from "../../assets";

// utils
import { calculateBarPercentage, daysLeft } from "../../utils";
import CampaignDetailsHeader from "./components/CampaignDetailsHeader";
import { toast } from "react-hot-toast";
import CampaignDetailsContent from "./components/CampaignDetailsContent";


const CampaignDetails = () => {

    // get a state from navigate (location)
    const {
        state
    } = useLocation();

    // campaigns states
    const {
        getDonations,
        contract,
        address,
        donate,
    } = useStateCampaign();

    // states
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);


    const remainDays = daysLeft(state.deadline);

    // get all donators to a campaign
    const fetchDonators = async () => {
        const data = await getDonations(state.pId);

        setDonators(data);
    }

    useEffect(() => {

        if (contract) fetchDonators();

    }, [contract, address]);


    // handle donate
    const handleDonate = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            
            await donate(state.pId, amount);

            toast.success('You have successufully donate!');
        } catch (error) {
            toast.error(error.message);
        
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {
                isLoading && <Loader />
            }
            {/*
            
            <div
                className="
                w-full
                flex
                md:flex-row
                flex-col
                mt-10
                gap-[30px]
                "
            >
                <div className="flex-1 flex-col">
                    <img src={state.image} alt="campaign" className="
                    w-full
                    h-[410px]
                    object-cover
                    rounded-xl
                    " />
                    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                        <div
                            className="absoluteh-full bg-[#4acd8d]"
                            style={{
                                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                                maxWidth: '100%'
                            }}
                        >

                        </div>
                    </div>
                </div>

            <div
                className="
                flex
                md:w-[150px]
                w-full
                flex-wrap
                justify-between
                gap-[30px]
                "
            >
                <CountBox title="Days left" value={remainDeays} />
                <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
                <CountBox title="Total Backers" value={donators.length} />
            </div>

            </div>
            */}
            <CampaignDetailsHeader
                image={state.image}
                amountCollected={state.amountCollected}
                target={state.target}
                remainDays={remainDays}
                amountDonators={donators.length}
            />
            <CampaignDetailsContent
                donate={donate}
                donators={donators}
                owner={state.owner}
                description={state.description}
                pId={state.pId}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            {/*
            <div
                className="mt-[60px] flex lg:lex-row flex-col gap-5"
            >
                <div
                    className="flex-[2] flex flex-col gap-[40px]"
                >
                    <div>
                        <h4
                            className="
                            font-epilogue
                            font-semibold
                            text-[18px]
                            text-white
                            uppercase
                            "
                        >
                            Creator
                        </h4>

                        <div
                            className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]"
                        >
                            <div
                                className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer"
                            >
                                <img src={thirdweb} alt="usre" className="w-[60%] h-[60%] object-contain" />
                            </div>
                            <div>
                                <h4
                                    className="font-epilogue font-semibold text-white text-[14px] break-all"
                                >
                                    {state.owner}
                                </h4>
                                <p
                                    className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]"
                                >
                                    Charity Organizer
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4
                            className="
                            font-epilogue
                            font-semibold
                            text-[18px]
                            text-white
                            uppercase
                            "
                        >
                            Story
                        </h4>
                        <div
                            className="mt-[20px]"
                        >
                            <p
                                className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                            >
                                {state.description}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4
                            className="
                            font-epilogue
                            font-semibold
                            text-[18px]
                            text-white
                            uppercase
                            "
                        >
                            Donators
                        </h4>
                        <div
                            className="mt-[20px] flex flex-col gap-4"
                        >
                            {
                                donators.length > 0 ? donators.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <p
                                            className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all"
                                        >
                                          {index + 1}. {item.donation}  
                                        </p>
                                    </div>
                                )) : (
                                    <p
                                        className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                                    >
                                        Not donators yet. Be the first one!
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div
                    className="flex-1"
                >
                    <h4
                        className="
                            font-epilogue
                            font-semibold
                            text-[18px]
                            text-white
                            uppercase
                            "
                    >
                        Fund
                    </h4>
                    <div
                        className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]"
                    >
                        <p
                            className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]"
                        >
                            Fund the campaign
                        </p>
                        <div
                            className="mt-[30px]"
                        >
                            <input
                                type="number"
                                placeholder="ETH 0.1"
                                step="0.1"
                                className="
                                w-full
                                py-[10px]
                                sm:px-[20px]
                                px-[15px]
                                outline-none
                                border-[1px]
                                border-[#3a3a43]
                                text-white
                                text-[18px]
                                leading-[30px]
                                placeholder:text-[#4b5264]
                                rounded-[10px]
                                "
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div
                                className="
                                mt-[20px]
                                p-4
                                bg-[#13131a]
                                rounded-[10px]
                                "
                            >
                                <h4
                                    className="
                                    font-epilogue
                                    font-semibold
                                    text-[14px]
                                    leading-[22px]
                                    text-white
                                    "
                                >
                                    Give hope and create change.
                                </h4>
                                <p
                                    className="
                                    mt-[20px]
                                    font-epilogue
                                    font-normal
                                    leading-[22px]
                                    text-[#808191]
                                    "
                                >
                                    Support the project for no reward, just because it speaks to you.
                                </p>
                                <CustomButton
                                    btnType="button"
                                    title="Fund Campaign"
                                    styles="w-full bg-[#8c6dfd]"
                                    handleClick={handleDonate}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            */}
        </div>
    );
}

export default CampaignDetails;