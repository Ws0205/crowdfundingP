// hooks
import { useContext } from "react";

// context
import { StateCampaignContext } from "../../contexts/StateCampaignContext";

const useStateCampaign = () => useContext(StateCampaignContext);

export default useStateCampaign;