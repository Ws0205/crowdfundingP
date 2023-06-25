
// react tools
import {
    useContext,
    createContext,
} from 'react';

// custom hooks
import { useDonate, useGetCampaigns, useGetUserCampaigns, useGetDonations, usePublishCampaign, useSearchCampaigns } from '../../hooks';

// thirdweb hooks
import {
    useAddress,
    useContract,
    useMetamask,
    useDisconnect,
} from '@thirdweb-dev/react';

// context
export const StateCampaignContext = createContext();

// provider
const StateCampaignContextProvider = ({ children }) => {
    
    // the crowdfunding contract 
    const {
        contract,
    } = useContract('0xd55C96CE3C54d37709Ef8F8ad55F0f617E41E6db');// INSERT HERE YOUR CONTRACT'S ADDRESS

    // owner wallet address
    const address = useAddress();

    const connect = useMetamask();

    const disconnect = useDisconnect();

    const publishCampaign = usePublishCampaign(contract);

    const getCampaigns = useGetCampaigns(contract);

    const getUserCampaigns = useGetUserCampaigns(address, contract);

    const getSearchedCampaigns = useSearchCampaigns(contract);

    const donate = useDonate(contract);

    const getDonations = useGetDonations(contract);

    return (
        <StateCampaignContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
                getCampaigns,
                connect,
                getUserCampaigns,
                donate,
                getDonations,
                disconnect,
                getSearchedCampaigns,
            }}
        >
            {children}
        </StateCampaignContext.Provider>
    )
}

export default StateCampaignContextProvider;