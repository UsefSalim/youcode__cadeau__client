/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import {
  IconButton,
  TooltipMenu,
  TooltipMenuView,
  TooltipMenuEdit,
  TooltipMenuDownload,
  TooltipMenuPrint,
  ButtonGroup,
} from '@laazyry/sobrus-design-system';
import './Header.css';
import Logo from 'assets/Logo.png';
import { Link, NavLink as RouterNavLink, useHistory } from 'react-router-dom';
import { AuthContext } from 'Context';
import { useContext } from 'react';
import { AiOutlineLogin, BsFillPersonPlusFill } from 'react-icons/all';
import { CustomInput } from 'Components';
import AccountPage from './AccountPage/AccountPage';
import { Navbar } from 'Components/Navbar/Navbar';
import { Button } from '@laazyry/sobrus-design-system';

const Header = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [open, setOpen] = useState();
  const history = useHistory();
  const handelReddirect = () => {
    if (user?.role === 'User') history.push('/profile');
    if (user?.role === 'Seller') history.push('/shope');
    if (user?.role === 'Admin') history.push('/dashboard');
  };
  console.log(user?.role);
  return (
    <div className='header'>
      {open && <AccountPage open={open} setOpen={setOpen} />}
      <Link to='/home' className='Header_logo'>
        <div className='header__logo'>
          <img width='200px' src={Logo} alt='' />
        </div>
      </Link>
      <div className='headerSearch'>
        <CustomInput placeholder='Chercher-vous quelque chose ?' />
      </div>
      <div className='header__icons'>
        {!loading && Object.keys(user).length > 0 ? (
          <div style={{ display: 'flex' }}>
            <Button
              outline
              color='danger'
              style={{ borderRight: 0, borderLeft: 0 }}
              onClick={handelReddirect}
            >
              {user?.role === 'Seller' ? 'Store' : user?.role === 'Admin' ? 'Dashboard' : 'Profile'}
            </Button>
            <Button
              onClick={() => logout()}
              outline
              color='danger'
              style={{ borderRight: 0, borderLeft: 0 }}
            >
              Deconnexion
            </Button>
            {/* </ButtonGroup> */}
          </div>
        ) : (
          <IconButton
            onClick={() => setOpen(!open)}
            style={{
              margin: '0 4px',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'red',
              color: '#fafafa',
            }}
            color='red'
          >
            <span style={{ marginRight: 12 }}>Mon Compte</span> <BsFillPersonPlusFill size={20} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Header;
