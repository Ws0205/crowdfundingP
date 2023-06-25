// hooks
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// custom hooks
import { useStateCampaign } from "../../hooks";

// React router dom tools
import { Link, useNavigate } from 'react-router-dom';

// custom components
import {
    CustomIcon,
} from '../';

// assets
import { logo, sun } from '../../assets';
import { navlinks } from "../../constants";


const Sidebar = () => {

    // campaigns states
    const {
        address,
        disconnect,
    } = useStateCampaign();

    // location controller
    const { pathname } = useLocation();

    // navigation controller
    const navigate = useNavigate();

    // active states
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState();

    // it will activate the icon according with the pathname
    useEffect(() => {
        
        const activeName = pathname === "/"  || pathname.match(/search/g) ? "dashboard"  : pathname === '/create-campaign' || pathname.match(/campaign-details/g) ? "campaign" : pathname.replace('/', '').trimStart();
        setIsLoading(true);
        setIsActive(activeName);
        setIsLoading(false);
    }, [pathname]);

    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
            <Link to="/">
                <CustomIcon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
            </Link>

            <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((link) => {
                        if (link.name === 'logout' && !address || link.name === 'profile' && !address) return;

                        return (
                            <abbr
                                title={link.name}
                                key={link.name}
                            >
                                <CustomIcon
                                    {...link}
                                    isActive={isActive}
                                    handleClick={() => {
                                        if (link.name === 'logout' && address) disconnect();

                                        if (!link.disabled) {
                                            setIsActive(link.name);
                                            navigate(link.link);
                                        }
                                    }}
                                />

                            </abbr>
                        );
                    }
                    )}
                </div>

                <CustomIcon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
            </div>
        </div>
    );
}

export default Sidebar;