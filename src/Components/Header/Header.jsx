/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { IconButton } from '@laazyry/sobrus-design-system';
import './Header.css';
import Logo from 'assets/Logo.png';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from 'Context';
import { useContext } from 'react';
import { BsFillPersonPlusFill, BsGift } from 'react-icons/all';
import { CustomInput } from 'Components';
import AccountPage from './AccountPage/AccountPage';
import { Button } from '@laazyry/sobrus-design-system';
import { sellerNavRoutes } from 'Values/NavPath';
import { useOptions } from 'Hooks';
import { PanierContext } from 'Context';
import { PopupContext } from 'Context';

const Header = () => {
  const [colors, setColors] = useState({ color: 'red', bg: '#fafafa' });
  const { panier } = useContext(PanierContext);
  useEffect(() => {
    setColors(panier ? { bg: 'red', color: '#fafafa' } : { color: 'red', bg: '#fafafa' });
  }, [panier]);
  const { user, logout, loading } = useContext(AuthContext);
  const { open, setOpen } = useContext(PopupContext);
  const history = useHistory();
  const handelReddirect = () => {
    if (user?.role === 'User') history.push('/profile');
    if (user?.role === 'Seller') history.push('/shope');
    if (user?.role === 'Admin') history.push('/dashboard');
  };
  const categoriesOptions = useOptions('/categories', ['_id', 'name'], 'get', 'data');
  return (
    <>
      <div className='header'>
        {open && <AccountPage open={open} setOpen={setOpen} />}
        <Link to='/' className='Header_logo'>
          <div className='header__logo'>
            <img width='200px' src={Logo} alt='' />
          </div>
        </Link>
        <div className='headerSearch'>
          <CustomInput placeholder='Chercher-vous quelque chose ?' />
        </div>
        <div className='header__icons'>
          <div style={{ position: 'relative', margin: '0 2rem' }}>
            <Link to='/panier'>
              <IconButton
                style={{
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: colors.bg,
                  color: colors.color,
                }}
                color='red'
              >
                <BsGift size={20} />
              </IconButton>
              {panier.length > 0 && <span className='notif'>{panier?.length}</span>}
            </Link>
          </div>
          {!loading && Object.keys(user).length > 0 ? (
            <div style={{ display: 'flex' }}>
              <Button
                outline
                color='danger'
                style={{ borderRight: 0, borderLeft: 0 }}
                onClick={handelReddirect}
              >
                {user?.role === 'Seller'
                  ? 'Store'
                  : user?.role === 'Admin'
                  ? 'Dashboard'
                  : 'Profile'}
              </Button>
              <Button
                onClick={() => logout()}
                outline
                color='danger'
                style={{ borderRight: 0, borderLeft: 0 }}
              >
                Deconnexion
              </Button>
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
      <div className='header2'>
        <div>
          {categoriesOptions?.map((c) => (
            <NavLink to={`/categorie/${c?.value}`}>{c.label}</NavLink>
          ))}
        </div>
        {user?.role && (
          <span>
            <BsGift size={20} />
          </span>
        )}
        <div>
          {user?.role === 'Seller' &&
            sellerNavRoutes.map((r) => <NavLink to={r?.path}>{r.name}</NavLink>)}
        </div>
      </div>
    </>
  );
};

export default Header;
