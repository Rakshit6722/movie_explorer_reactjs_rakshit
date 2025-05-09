import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome2Line, RiHome2Fill, RiMovie2Line, RiMovie2Fill } from "react-icons/ri";
import { FaRegUser, FaUser } from "react-icons/fa";
import { TbMoodSmile, TbMoodSmileFilled } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { LuSearchCode } from "react-icons/lu";
import Logo from '../../../assets/images/movieExplorerLogoNew.png';
import NavItem from './NavItem';
import WithReduxState from '../../hoc/WithReduxState';

interface NavItemProps {
  icon: any;
  label: string;
  href: string;
  location?: any;
  userInfo?: any;
  isLoggedIn?: boolean;
}

interface HeaderState {
  expanded: boolean;
  windowWidth: number;
}

class Header extends Component<any, HeaderState> {
  clickOutisideRef: React.RefObject<HTMLDivElement | null>;
  constructor(props: any) {
    super(props);
    this.clickOutisideRef = React.createRef<HTMLDivElement>();
    this.state = {
      expanded: false,
      windowWidth: window.innerWidth,
    };
  }


  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('click', this.handleClickOutside);
    // this.handleResize();    
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleResize = () => {
    const windowWidth = window.innerWidth;
    this.setState({
      windowWidth,
    });
  };

  handleMouseEnter = () => {
    if (this.state.windowWidth >= 768) {
      this.setState({ expanded: true });
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if(this.clickOutisideRef.current && !this.clickOutisideRef.current.contains(event.target as Node)) {
      this.setState({ expanded: false });
    }
  }

  handleMouseLeave = () => {
    if (this.state.windowWidth >= 768) {
      this.setState({ expanded: false });
    }
  };

  render() {

    const NAV_ITEMS: Array<NavItemProps> = [
      {
        icon: {
          outline: <RiHome2Line size={22} />,
          filled: <RiHome2Fill size={22} />,
        },
        label: 'Home',
        href: '/home'
      },
      {
        icon: {
          outline: <IoSearchOutline size={22} />,
          filled: <LuSearchCode size={22} />,
        },
        label: 'Search',
        href: '/search'
      },
      {
        icon: {
          outline: <RiMovie2Line size={22} />,
          filled: <RiMovie2Fill size={22} />,
        },
        label: 'Genres',
        href: '/genres?pageCount=1'
      },
      {
        icon: {
          outline: <TbMoodSmile size={22} />,
          filled: <TbMoodSmileFilled size={22} />,
        },
        label: 'Moods',
        href: '/moods'
      },
      {
        icon: {
          outline: <FaRegUser size={22} />,
          filled: <FaUser size={22} />,
        },
        label: this.props.isLoggedIn ? `Hi, ${this.props.userInfo.first_name}` : "Login",
        href: this.props.isLoggedIn ? '/profile' : "/login",
      },
    ];

    const { expanded } = this.state;

    return (
      <div
        className="fixed top-0 left-0 h-screen flex z-50"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.clickOutisideRef}
      >
        <div className="h-full bg-black md:w-20 flex flex-col items-center py-8 shadow-lg">

          <NavLink to={'/'}>
            <div className="mb-12">

              <img
                src={Logo}
                alt="Logo"
                className="h-12 w-12 md:h-28 md:w-28 object-contain transition-all duration-300"
              />
            </div>
          </NavLink>

          <nav className="flex flex-col space-y-4 pl-4 items-center pt-8">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </nav>
        </div>

        <div
          className={`h-full bg-gradient-to-r from-black via-black/40 to-transparent
                    transition-all duration-2200 ease-linear overflow-hidden flex py-16
                    ${expanded ? 'w-60 opacity-100' : 'w-0 opacity-0'}`}
        >
          <div className="flex flex-col space-y-7 pl-2 pt-[167px]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                to={item.href}
                key={item.label}
                className={({ isActive }: any) =>
                  `font-medium  text-lg whitespace-nowrap
                   flex items-center font-sans space-x-2 transition-all duration-300
                   ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default WithReduxState(Header);
