// hooks
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";


const usePublishCampaign = (contract) => {

    // get create campaign function
    const {
        mutateAsync: createCampaign
    } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();

    const publishCampaign = async (formFields) => {
        const data = await createCampaign({
            args: [
                address, // campaign wallet
                formFields.title, // campaign title
                formFields.description, // campaign description
                formFields.target, // campaign endgoal
                new Date(formFields.deadline).getTime(), // campaign deadline
                formFields.image, // campaign cover image url
                formFields.categories, // campaign categories
            ]
        });

        console.log(data);

    }

    return publishCampaign;
};

export default usePublishCampaign;