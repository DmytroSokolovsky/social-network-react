import s from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface NavPropsType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Nav = ({ menuOpen, setMenuOpen }: NavPropsType) => {
  let linksClass = cn(s.sidebar__link, s.sidebar__link_active);
  let sidebarClass = cn(s.sidebar, {
    [s.active]: menuOpen,
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
              to="dialogs"
              className={({ isActive }) =>
                isActive ? linksClass : s.sidebar__link
              }
              onClick={handleCloseMenu}
            >
              Messages
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
