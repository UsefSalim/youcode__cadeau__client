/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useContext } from 'react';
import { Link, NavLink as RouterNavLink, useHistory } from 'react-router-dom';
import { AuthContext } from 'Context/AuthContext';
import { NavPath } from 'Values/navPath';
import {
  Collapse,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavItemMore,
  NavItemMoreSubMenu,
  NavItemMoreBtn,
  NavUserProfile,
  DropdownItem,
  NavLogoutLink,
} from '@laazyry/sobrus-design-system';
import { Navbar } from '../Navbar/Navbar';
import './Header.css';
import { useAcl } from 'Components/AuthComponent/Acl';
import { NotificationsContext } from 'Context/NotificationsContext';
const Header = () => {
  const history = useHistory();
  const [showDropDown, setShowDropDown] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const { state, loadingNotifications } = useContext(NotificationsContext);
  const { can } = useAcl();
  // const handleDelete = async ()=>{
  //   try {
  //     await API.get
  //   } catch (error) {

  //   }
  // }
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Navbar style={{ padding: '0 3%' }}>
        <NavbarBrand>
          <Link to='/home' className='Header_logo'>
            {/* <img src={EcoLogo} width="150" /> */}
            <p>
              <strong>Sobrus</strong> WorkSpace
            </p>
          </Link>
        </NavbarBrand>
        <Collapse>
          <Nav>
            {NavPath?.map((headerItem, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className='HeaderItem'
                onMouseEnter={() => {
                  setShowDropDown(headerItem?.itemTitle);
                }}
                onMouseOut={() => {
                  setShowDropDown(false);
                }}
              >
                <NavItem>
                  {headerItem?.droped ? (
                    <NavLink>{headerItem?.itemTitle}</NavLink>
                  ) : (
                    headerItem?.does &&
                    can(headerItem?.does) && (
                      <NavLink tag={RouterNavLink} to={headerItem?.to}>
                        {headerItem?.itemTitle}
                      </NavLink>
                    )
                  )}
                  {showDropDown === headerItem?.itemTitle && (
                    <div className='subHeaderItem'>
                      {headerItem?.dropDown?.map(
                        (subHeaderItem, key) =>
                          subHeaderItem?.does &&
                          can(subHeaderItem?.does) && (
                            <NavLink
                              // eslint-disable-next-line react/no-array-index-key
                              key={`header${key}`}
                              tag={RouterNavLink}
                              to={subHeaderItem?.to}
                              onMouseEnter={() => setShowDropDown(headerItem?.itemTitle)}
                              onMouseOut={() => setShowDropDown(false)}
                            >
                              {subHeaderItem?.itemTitle}
                            </NavLink>
                          )
                      )}
                    </div>
                  )}
                </NavItem>
              </div>
            ))}
            <NavItemMore>
              <NavItemMoreBtn title='Plus' />
              <NavItemMoreSubMenu />
            </NavItemMore>
          </Nav>
          <div className='navbar__part2'>
            {!loadingNotifications && can('get_collaborater_notifications') && (
              <div
                className={
                  state?.totalnotifications > 0 ? 'nav__notifications' : 'nav__notifications__empty'
                }
                onClick={() => history.push('/notifications')}
              >
                <p style={{ marginBottom: 0, fontWeight: 700 }}>{state?.totalnotifications}</p>
                <small style={{ fontSize: 12 }}>Notif</small>
              </div>
            )}
            <NavUserProfile fullName={!loading ? `${user?.lastName} ${user?.firstName}` : ''}>
              <DropdownItem className='last-dropdown-item'>
                <NavLogoutLink onClick={() => {}} />
              </DropdownItem>
            </NavUserProfile>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
