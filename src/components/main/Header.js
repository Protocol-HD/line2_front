import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../images/ansimlogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { selectUser } from '../../_reducers';

function Header() {

    const user = useSelector(selectUser);
    console.log(user);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hostdropdownRef = useRef(null);
    const guestdropdownRef = useRef(null);
    const [hostActive, setHostActive] = useDetectOutsideClick(
        hostdropdownRef,
        false,
    );
    const [guestActive, setGuestActive] = useDetectOutsideClick(
        guestdropdownRef,
        false,
    );

    const handleGeustIcon = () => {
        setGuestActive(!guestActive);
    };
    const handleHostIcon = () => {
        setHostActive(!hostActive);
    };

    const onLogoutHandle=()=>{
        dispatch(logoutUser())
        .then(
            navigate('/login')
        )
    }

    return (
        <>
            <div className="header">
                <img
                    className="header_icon"
                    src={logo}
                    alt="logo"
                    onClick={() => navigate('/')}
                />

                <div className="header_right">
                    <div className="menu_container">
                        <button
                            onClick={handleHostIcon}
                            className="hostmenu_trigger"
                        >
                            <ExpandMoreIcon />
                            <HomeIcon />
                            <p>호스트</p>
                        </button>
                        <nav
                            ref={hostdropdownRef}
                            className={`hostmenu ${
                                hostActive ? 'active' : 'inactive'
                            }`}
                        >
                            <ul>
                                <li>
                                    <Link to={'/'}> 로그인</Link>
                                </li>
                                <li>
                                    <Link to={'/host/signup'}> 회원가입</Link>
                                </li>
                                <li>
                                    <Link to={'/hosting1'}>숙소 등록</Link>
                                </li>
                                <li>
                                    <Link to={'/host'}>호스트 마이페이지</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="menu_container">
                        <button
                            onClick={handleGeustIcon}
                            className="guestmenu_trigger"
                        >
                            <ExpandMoreIcon />
                            <AccountCircleIcon />
                            <p>게스트</p>
                        </button>
                        <nav
                            ref={guestdropdownRef}
                            className={`guestmenu ${
                                guestActive ? 'active' : 'inactive'
                            }`}
                        >
                            <ul>
                                {
                                    user ? (
                                        <>
                                    <li>
                                        <Link to={'/guest'}>게스트 마이페이지</Link>
                                    </li>

                                    <li onClick={onLogoutHandle}>
                                        <Link to= {'/'}> 로그아웃 </Link>
                                    </li>
                                        
                                    </>
                                    ):(
                                        <>
                                    <li>
                                        <Link to={'/login'}> 로그인</Link>
                                    </li>
                                    <li>
                                        <Link to={'/guest/signup'}> 회원가입</Link>
                                    </li>
                                    </>
                                    )
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
