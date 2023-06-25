// custom hooks
import { useGetCampaigns } from "..";

const useSearchCampaigns = (contract) => {
    // get function get campaigns
    const getCampaigns = useGetCampaigns(contract);

    // filter campaigns
    const getSearchedCampaigns = async (searched, typeSearch = "title") => {
        if (!searched) return [];

        // get all campaigns from block chain
        const allCampaigns = await getCampaigns();


        console.log(allCampaigns);
        // filtered campaigns
        const filteredCampaigns = allCampaigns
            .filter((campaign) => {
                console.log(campaign[typeSearch]);
                console.log(campaign[typeSearch].toLowerCase().includes(searched));
                return campaign[typeSearch].toLowerCase().includes(searched.toLowerCase())
            });

        return filteredCampaigns;
    }

    return getSearchedCampaigns;
}

export default useSearchCampaigns;