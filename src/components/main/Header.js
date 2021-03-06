import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { selectUser } from '../../_reducers';
import logo from '../../images/logo.svg';
import { Face } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import Search from './Search';

function Header() {
    const user = useSelector(selectUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const myFunction = () => {
        document.getElementById('myDropdown').classList.toggle('show');
    };

    // Close the dropdown if the user clicks outside of it
    window.onclick = event => {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    const onLogoutHandle = () => {
        dispatch(logoutUser()).then(navigate('/login'));
    };

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <img className="header_icon" src={logo} alt="logo" onClick={() => navigate('/')} />
                    <Search />

                    <div className="header_right">
                        {user ? (
                            <>
                                {user.host ? (
                                    <>
                                        <div className="dropbtn" onClick={myFunction}>
                                            <Button
                                                className="dropbtn"
                                                style={{
                                                    borderRadius: 35,
                                                    backgroundColor: '#125b30',
                                                    padding: '8px',
                                                    fontSize: '8px',
                                                }}
                                                variant="contained"
                                            >
                                                <HomeIcon
                                                    className="dropbtn"
                                                    style={{ color: '#ffffff', fontSize: '30px' }}
                                                />
                                                <p className="dropbtn">?????????</p>
                                                <ExpandMoreIcon style={{ fontSize: '30px' }} className="dropbtn" />
                                            </Button>
                                            <div id="myDropdown" className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <Link to={'/hosting1'}>?????? ??????</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={'/host'} style={{ textDecoration: 'none' }}>
                                                            ????????? ???????????????
                                                        </Link>
                                                    </li>
                                                    <li onClick={onLogoutHandle}>
                                                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                                                            {' '}
                                                            ????????????{' '}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="dropbtn">
                                            <Button
                                                onClick={myFunction}
                                                className="dropbtn"
                                                style={{
                                                    borderRadius: 35,
                                                    backgroundColor: '#125b30',
                                                    padding: '8px',
                                                    fontSize: '8px',
                                                }}
                                                variant="contained"
                                            >
                                                <Face
                                                    style={{ color: '#ffffff', fontSize: '30px' }}
                                                    className="dropbtn"
                                                />
                                                <p className="dropbtn">?????????</p>
                                                <ExpandMoreIcon style={{ fontSize: '30px' }} className="dropbtn" />
                                            </Button>
                                            <div id="myDropdown" className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <Link to={'/guest'}>????????? ???????????????</Link>
                                                    </li>

                                                    <li onClick={onLogoutHandle}>
                                                        <Link to={'/'}> ???????????? </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="dropbtn">
                                    <Button
                                        onClick={myFunction}
                                        className="dropbtn"
                                        style={{
                                            borderRadius: 35,
                                            backgroundColor: '#125b30',
                                            padding: '8px',
                                            fontSize: '8px',
                                        }}
                                        variant="contained"
                                    >
                                        <AccountCircleIcon
                                            className="dropbtn"
                                            style={{ color: '#ffffff', fontSize: '30px' }}
                                        />
                                        <p className="dropbtn">?????????</p>
                                        <ExpandMoreIcon className="dropbtn" style={{ fontSize: '30px' }} />
                                    </Button>
                                    <div id="myDropdown" className="dropdown-content">
                                        <ul>
                                            <li>
                                                <Link to={'/login'}>?????????</Link>
                                            </li>
                                            <li>
                                                <Link to={'/guest/signup'}>????????? ????????????</Link>
                                            </li>
                                            <li>
                                                <Link to={'/host/signup'}>????????? ????????????</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
