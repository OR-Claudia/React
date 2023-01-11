import { Outlet, Link } from "react-router-dom"; //fancy anchor tag- A <Link> is an element that lets the user navigate to another page by clicking or tapping on it.
//An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered.
import { Fragment } from "react"; /** A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM  */
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
	return (
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
					{/* anything inside of the link with to= will also link to the same path */}
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
				</div>
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
