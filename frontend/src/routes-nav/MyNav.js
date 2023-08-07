import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../profile/UserContext';
import './MyNav.css';

function Nav() {
    const { currentUser, setCurrentUser, setToken } = useContext(UserContext);

    async function logoutUser() {
        setToken(null);
        setCurrentUser(null);
        setToken(null);
    }

    return (
        <div className="MyNavBarClass">
            <div className="left-section">
                <p> <NavLink exact to="/" className="nav-link">Jobly</NavLink></p>
            </div>
            <div className="right-section">
                {!currentUser ? (
                    <>
                        <p> <NavLink to="/login" className="nav-link">Login</NavLink> </p>
                        <p> <NavLink to="/signup" className="nav-link">Sign Up</NavLink></p>
                    </>
                ) : (
                    <>
                        <p> <NavLink  exact to="/companies" className="nav-link">Companies</NavLink></p>
                        <p> <NavLink  to="/jobs" className="nav-link">Jobs</NavLink></p>
                        <p> <NavLink  to="/profile" className="nav-link">Profile</NavLink></p>
                        <p>
                            <Link className="nav-link logout-link" to="/" onClick={logoutUser}>
                                Logout {currentUser.firstName || currentUser.username}
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Nav;
