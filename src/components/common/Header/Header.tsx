import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RiHome2Line, RiHome2Fill, RiMovie2Line, RiMovie2Fill, RiVideoOnLine, RiVideoOnFill } from "react-icons/ri";
import { FaRegUser, FaUser } from "react-icons/fa";
import { TbMoodSmile, TbMoodSmileFilled } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { LuSearchCode } from "react-icons/lu";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Logo from '../../../assets/images/movieExplorerLogoNew.png';
import NavItem from './NavItem';
import WithReduxState from '../../hoc/WithReduxState';
import { User } from '../../../types/type';
import LetterAvatars from './NameBadge';

interface NavItemType {
  icon: any;
  label: string;
  href: string;
}

interface HeaderState {
  expanded: boolean;
  windowWidth: number;
  mobileMenuOpen: boolean;
}

interface HeaderProps {
  location: {
    pathname: string;
  }
  isLoggedIn: boolean;
  userInfo: User
}

class Header extends Component<HeaderProps, HeaderState> {
  clickOutisideRef: React.RefObject<HTMLDivElement | null>;
  constructor(props: HeaderProps) {
    super(props);
    this.clickOutisideRef = React.createRef<HTMLDivElement>();
    this.state = {
      expanded: false,
      windowWidth: window.innerWidth,
      mobileMenuOpen: false
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
    if (this.clickOutisideRef.current && !this.clickOutisideRef.current.contains(event.target as Node)) {
      this.setState({ expanded: false });
    }
  }

  handleMouseLeave = () => {
    if (this.state.windowWidth >= 768) {
      this.setState({ expanded: false });
    }
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  closeMobileMenu = () => {
    this.setState({ mobileMenuOpen: false });
  };

  render() {

    const NAV_ITEMS: Array<NavItemType | any> = [
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
        label: 'Explore',
        href: '/genres?pageCount=1'
      },
      this.props.isLoggedIn ? {
        icon: {
          outline: <RiVideoOnLine size={22} />,
          filled: <RiVideoOnFill size={22} />,
        },
        label: 'Watchlist',
        href: '/watchlist'
      } : null,
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
          outline: this.props.isLoggedIn ? <LetterAvatars firstLetter={this.props.userInfo.first_name[0]} /> : <FaRegUser size={22} />,
          filled: this.props.isLoggedIn ? <LetterAvatars firstLetter={this.props.userInfo.first_name[0]} /> : <FaUser size={22} />,
        },
        label: this.props.isLoggedIn ? `Hi, ${this.props.userInfo.first_name}` : "Login",
        href: this.props.isLoggedIn ? '/profile' : "/login",
      },

    ];

    const { expanded, mobileMenuOpen, windowWidth } = this.state;
    const isMobile = windowWidth < 768;

    return (
      <>
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-sm z-50 
                      flex items-center justify-between px-4 border-b border-gray-800/50">
          <NavLink to={'/'} onClick={this.closeMobileMenu}>
            <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
          </NavLink>
          <button
            onClick={this.toggleMobileMenu}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </button>
        </div>

        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 mt-10 bg-black/95 z-40 pt-16">
            <div className="flex flex-col space-y-6 px-6 py-8">
              {NAV_ITEMS.map((item) => (
                item !== null && (
                  <NavLink
                    to={item.href}
                    key={item.label}
                    className={({ isActive }) =>
                      `font-medium text-lg flex items-center space-x-4 p-2
                      ${isActive ? 'text-white bg-gray-800/50 rounded-lg' : 'text-gray-400'}`
                    }
                    onClick={this.closeMobileMenu}
                  >
                    <span>{item.icon.filled}</span>
                    <span>{item.label}</span>
                  </NavLink>
                )
              ))}
            </div>
          </div>
        )}

        <div
          className={`fixed top-0 left-0 h-screen hidden md:flex z-50 ${mobileMenuOpen ? 'hidden' : ''}`}
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
                item !== null && (
                  <NavItem key={item.label} {...item} />
                )
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
                item !== null && (
                  <NavLink
                    data-testid="nav-link"
                    to={item.href}
                    key={item.label}
                    className={({ isActive }: any) =>
                      `font-medium text-lg whitespace-nowrap
                     flex items-center font-sans space-x-2 transition-all duration-300
                     ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WithReduxState(Header);
