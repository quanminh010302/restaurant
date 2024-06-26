import Cookies from 'js-cookie';
import './Header.scss'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { BsClipboardFill, BsFillPersonFill,BsCartCheck } from 'react-icons/bs';
import { useAuth } from "../../component/Context/AuthProvider";

const Header = () => {
    const { token, firstName, email, logout , login, avatar} = useAuth(); // lưu trạng thái hoạt động
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate(); // Sử dụng useNavigate

    useEffect(() => {
        const tokenFromCookie = Cookies.get('token_user');

        if (tokenFromCookie) {
            const decodedToken = jwt_decode(tokenFromCookie);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            const firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const avatar = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country'];

            login(tokenFromCookie, firstName, email, avatar);
        }
    }, [login]);

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ context
        Cookies.remove('token_user'); // Xóa token khỏi cookie
        navigate('/'); // Điều hướng về trang home
    };

    return (
        <div className="nav">
            <div className="nav__container container">
                <Link to="/" className="nav__logo text-gradient">Food.</Link>
                <ul className="nav__links">
                    <li className='header'>
                        <Link className="nav-link text-black" to="/">
                            Trang Chủ
                        </Link>
                        <Link className="nav-link text-black" to="/listbranch">
                            Chi Nhánh
                        </Link>
                        <Link className="nav-link text-black" to="/listhall">
                            Sảnh Cưới
                        </Link>
                        <Link className="nav-link text-black" to="/listmenu">
                            Thực Đơn
                        </Link>
                        <Link className="nav-link text-black" to="/listservice">
                            Dịch Vụ
                        </Link>
                    </li>
                    <li className='header'>
                        {token? (
                            <>
                                <li className="nav-link ">{email}</li>
                                <img style={{width:'50px', height:'50px', marginTop:'-10px', borderRadius:'50%'}} src={avatar}></img>
                                <button onClick={handleLogout} className="nav-link text-black">Đăng Xuất</button>
                            </>
                        ) : (
                            <Link className="nav-link text-black" to="/login">
                                Đăng Nhập
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link to='profile' className="nav-link text-black">
                            <BsFillPersonFill className='header' />
                        </Link>
                    </li>
                
                    <li>
                        <Link to='history' className="nav-link text-black">
                            <BsClipboardFill className='header' />
                        </Link>
                    </li>
                 
                </ul>
            </div>
        </div>
    )
}

export default Header;
