import { ethers } from "ethers";


const useGetCampaigns = (contract) => {

    const getCampaigns = async () => {
        try {
            const campaigns = await contract.call('getCampaigns');

            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                categories: campaign.categories,
                pId: i
            }));


            return parsedCampaigns;
        } catch (error) {
            console.log(error);
        }

    }

    return getCampaigns;
};

export default useGetCampaigns;