import { useGetCampaigns } from "../";

const useGetUserCampaigns = (address, contract) => {
    // get function get campaigns
    const getCampaigns = useGetCampaigns(contract);

    // filter campaigns
    const getUserCampaigns = async () => {
        // get all campaigns from block chain
        const allCampaigns = await getCampaigns();

        // filtered campaigns
        const filteredCampaigns = allCampaigns
            .filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    return getUserCampaigns;
}

export default useGetUserCampaigns;