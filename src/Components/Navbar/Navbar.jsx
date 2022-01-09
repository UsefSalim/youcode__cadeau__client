import React, { useEffect, useRef, useCallback } from 'react';
import './style.css';

const Navbar = ({ children, ...rest }) => {
  const navbar = useRef(null);
  let removedNavItem = [];

  const getNavbarWidth = () => {
    return (
      parseFloat(navbar.current.clientWidth) -
      parseFloat(getComputedStyle(navbar.current).paddingLeft) -
      parseFloat(getComputedStyle(navbar.current).paddingRight)
    );
  };
  const getCorrectNavbarWidth = () => {
    const logoContainer = navbar.current.querySelector('#navbarBrandId');
    const navContainer = navbar.current.querySelector('#navId');
    const userInfosContainer = navbar.current.querySelector('#userInfosContainer');
    let correctNavContainerWidth = 0;
    if (getNavbarWidth()) {
      correctNavContainerWidth = getNavbarWidth();
    }
    if (logoContainer) {
      correctNavContainerWidth = correctNavContainerWidth - logoContainer.clientWidth;
    }
    if (userInfosContainer) {
      correctNavContainerWidth = correctNavContainerWidth - userInfosContainer.clientWidth - 16;
    }

    return Math.round(correctNavContainerWidth);
  };
  const resizeNavBar = useCallback(() => {
    // navContainer.style.width = `${(correctNavContainerWidth)}px`;
    const moreBtn = navbar.current.querySelector('#NavItemMoreId');
    const moreBtnSubMenu = moreBtn.querySelector('#NavItemMoreSubMenuId');

    const navContainer = navbar.current.querySelector('#navId');

    while (navContainer.clientWidth > getCorrectNavbarWidth()) {
      if (navContainer.lastChild.previousSibling) {
        removedNavItem.push({
          element: navContainer.lastChild.previousSibling,
          width: navContainer.lastChild.previousSibling.clientWidth,
        });
        navContainer.removeChild(navContainer.lastChild.previousSibling);
        //construct more sub menu
        if (
          moreBtn &&
          !moreBtn.classList.contains('nav-item-more-show') &&
          removedNavItem.length !== 0
        ) {
          moreBtn.classList.remove('nav-item-more-hide');
          moreBtn.classList.add('nav-item-more-show');
        }
        if (removedNavItem.length !== 0) {
          let element = removedNavItem[removedNavItem.length - 1].element;
          if (element) {
            element.classList.add('nav-item-more-sub-menu-item');
            if (moreBtnSubMenu && moreBtnSubMenu.firstChild) {
              moreBtnSubMenu.insertBefore(element, moreBtnSubMenu.firstChild);
            } else {
              if (moreBtnSubMenu) {
                moreBtnSubMenu.appendChild(element);
              }
            }
          }
        }
        //end construct more sub menu
      } else {
        return;
      }
    }

    while (navContainer.clientWidth < getCorrectNavbarWidth()) {
      if (removedNavItem.length !== 0 && moreBtn) {
        const widthOfElement = removedNavItem[removedNavItem.length - 1].width;
        if (navContainer.clientWidth + widthOfElement <= getCorrectNavbarWidth()) {
          removedNavItem[removedNavItem.length - 1].element.classList.remove(
            'nav-item-more-sub-menu-item'
          );
          navContainer.insertBefore(removedNavItem[removedNavItem.length - 1].element, moreBtn);
          // navContainer.appendChild(removedNavItem[removedNavItem.length - 1].element);
          if (removedNavItem.length === 1) {
            removedNavItem = [];
            if (!moreBtn.classList.contains('nav-item-more-hide') && removedNavItem.length === 0) {
              moreBtn.classList.remove('nav-item-more-show');
              moreBtn.classList.add('nav-item-more-hide');
            }
          } else {
            removedNavItem.pop();
          }
        } else {
          if (!moreBtn.classList.contains('nav-item-more-hide') && removedNavItem.length === 0) {
            moreBtn.classList.remove('nav-item-more-show');
            moreBtn.classList.add('nav-item-more-hide');
          }
          return;
        }
      } else {
        if (!moreBtn.classList.contains('nav-item-more-hide')) {
          moreBtn.classList.remove('nav-item-more-show');
          moreBtn.classList.add('nav-item-more-hide');
        }
        return;
      }
    }
  }, []);
  useEffect(() => {
    if (navbar) {
      resizeNavBar();
      window.addEventListener('resize', resizeNavBar);
    }

    return () => {
      if (navbar && window) {
        console.log(window);
        window?.removeEventListener('resize', resizeNavBar);
      }
    };
  }, [resizeNavBar]);
  return (
    <div ref={navbar} className={`navbar ${rest.className}`} {...rest}>
      {children}
    </div>
  );
};
export { Navbar };
