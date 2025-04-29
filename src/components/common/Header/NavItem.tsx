import { Component } from "react";
import { NavLink } from "react-router-dom";
import WithRouter from "../../hoc/WithRouter";

interface NavItemProps {
  icon: any;
  label: string;
  href: string;
  expanded?: boolean;
  location: any; 
}

interface NavItemState {
  activePage: boolean;
}

class NavItem extends Component<NavItemProps, NavItemState> {
  constructor(props: NavItemProps) {
    super(props);
    this.state = {
      activePage: props.location.pathname === props.href,
    };
  }

  componentDidUpdate(prevProps: NavItemProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        activePage: this.props.location.pathname === this.props.href,
      });
    }
  }

  handleMouseEnter = () => {
    this.setState({ activePage: true });
  };

  handleMouseLeave = () => {
    this.setState({ activePage: this.props.location.pathname === this.props.href });
  };

  render() {
    const { icon, label, href } = this.props;
    const { activePage } = this.state;

    return (
      <NavLink
        to={href}
        className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
        title={label}
        aria-label={label}
      >
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 hover:bg-[#f02c49e6]
            ${activePage ? 'bg-[#f02c49e6]' : ''}
          `}
        >
          {activePage ? (
            <span className="text-white">{icon.filled}</span>
          ) : (
            <span className="text-gray-400">{icon.outline}</span>
          )}
        </div>
      </NavLink>
    );
  }
}

export default WithRouter(NavItem);
