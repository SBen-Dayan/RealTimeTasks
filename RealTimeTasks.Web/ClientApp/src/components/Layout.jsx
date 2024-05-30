import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import axios from 'axios';

const Layout = ({ children }) => {
    const { isLoading, user, setUser } = useUser();

    const onLogoutClick = async () => {
        await axios.post('/api/account/logout');
        setUser(null);
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">Real Time Tasks</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!isLoading &&
                                    (user ? <>
                                        <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                                        <li className="nav-item">
                                            <button className='nav-link text-light' onClick={onLogoutClick}>
                                                Logout
                                            </button>
                                        </li>
                                    </> : <>
                                        <li className="nav-item"><Link to="/signup" className='nav-link text-light'>Signup</Link></li>
                                        <li className="nav-item"><Link to="/login" className='nav-link text-light'>Login</Link></li>
                                    </>
                                    )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5 py-5">
                {isLoading ? <div className="spinner-border text-info">:)</div> : children}
            </div>
        </div>
    )
}

export default Layout;