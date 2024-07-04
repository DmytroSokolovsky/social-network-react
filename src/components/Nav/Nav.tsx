import s from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { ThemeContext } from '../../context/context';

interface NavPropsType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Nav = ({ menuOpen, setMenuOpen }: NavPropsType) => {
  const theme = useContext(ThemeContext);

  let linksClass = cn(s.sidebar__link, s.sidebar__link_active);
  let sidebarClass = cn(s.sidebar, {
    [s.active]: menuOpen,
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={sidebarClass}>
      <div className={s.sidebar__body}>
        <ul className={s.sidebar__list}>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? linksClass : s.sidebar__link
              }
              onClick={handleCloseMenu}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? linksClass : s.sidebar__link
              }
              onClick={handleCloseMenu}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="chat"
              className={({ isActive }) =>
                isActive ? linksClass : s.sidebar__link
              }
              onClick={handleCloseMenu}
            >
              Chat
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
