// custom components
import { CustomButton, CountBox } from "../../../../components";

// utils
import { calculateBarPercentage } from '../../../../utils';

const CampaignDetailsHeader = ({
    image,
    target,
    amountCollected,
    remainDays,
    amountDonators
}) => {
    return (
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
                <img src={image} alt="campaign" className="
            w-full
            h-[410px]
            object-cover
            rounded-xl
            " />
                <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                    <div
                        className="absoluteh-full bg-[#4acd8d]"
                        style={{
                            width: `${calculateBarPercentage(target, amountCollected)}%`,
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
                <CountBox title="Days left" value={remainDays} />
                <CountBox title={`Raised of ${target}`} value={amountCollected} />
                <CountBox title="Total Backers" value={amountDonators} />
            </div>

        </div>
    );
};

export default CampaignDetailsHeader;