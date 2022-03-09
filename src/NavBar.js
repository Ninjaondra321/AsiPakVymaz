import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const NavBar = ({L_txt, L_link, M_txt, L_icon, R_icon, R_link}) => {


    return <div className="navbar">
    <div className="left">
            {L_txt && <p className="navbar-title">{L_txt}</p>}
        <Link to={L_link}>
            {L_icon && <div className={"icon i-" + L_icon}></div>}
        </Link>
    </div>

    <div className="middle">
        {M_txt && <p className="navbar-title">{M_txt}</p>}
    </div>

    <div className="rights">
        <Link to={R_link}>
            {R_icon && <div className={"icon i-" + R_icon}></div>}
        </Link>
    </div>

</div>;
};

NavBar.defaultProps = {
    iconLeft : "arrow-simple-right",
    title : "Navbar.js"
}


export default NavBar;
