// hooks
import { useState } from "react";

// custom hooks
import { useStateCampaign } from "../../hooks";

// React Router Dom tools
import {
    Link,
    useLocation,
    useNavigate
} from 'react-router-dom';

// custom components
import {
    CustomButton, Searchbar
} from '../';

// assets
import { logo, menu, search, thirdweb } from '../../assets';

// constants
import { navlinks } from "../../constants";


const Navbar = () => {
    const {
        pathname
    } = useLocation();

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState('dashboard');

    const [toggleDrawer, setToggleDrawer] = useState(false);

    const { connect, address } = useStateCampaign();

    return (
        <nav className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            {
                (pathname === "/" || pathname === "/profile"  || pathname.match(/search/g)) && (
                    <Searchbar />
                )
            }
            <div className="sm:flex hidden flex-row justify-end gap-4">
                {/*<Link to="/signup">
                    <button className="nav-button bg-[#1dc071] hover:bg-[#18a35c] text-white font-semibold py-2 px-4 rounded">
                    Sign Up
                    </button>
                </Link>
                <Link to="/login">
                    <button className="nav-button bg-[#8c6dfd] hover:bg-[#775bcc] text-white font-semibold py-2 px-4 rounded">
                    Log In
                    </button>
                </Link>*/}

                <CustomButton
                    btnType="button"
                    title={address ? 'Create a campaign' : 'Connect'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                        if (address) navigate('create-campaign')
                        else connect()
                    }}
                />

                <Link to="/profile">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                    </div>
                </Link>
            </div>

            {/* Small screen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                    <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
                </div>

                <img
                    src={menu}
                    alt="menu"
                    className="w-[34px] h-[34px] object-contain cursor-pointer"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                />

                <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                    <ul className="mb-4">
                        {navlinks.map((link) => (
                            <li
                                key={link.name}
                                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'} cursor-pointer`}
                                onClick={() => {
                                    setIsActive(link.name);
                                    setToggleDrawer(false);
                                    navigate(link.link);
                                }}
                            >
                                <img
                                    src={link.imgUrl}
                                    alt={link.name}
                                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                                />
                                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                                    {link.name}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="flex mx-4">
                        <CustomButton
                            btnType="button"
                            title={address ? 'Create a campaign' : 'Connect'}
                            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                            handleClick={() => {
                                if (address) navigate('create-campaign')
                                else connect();
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;