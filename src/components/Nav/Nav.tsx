import s from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Nav = () => {
  let linksClass = cn(s.sidebar__link, s.sidebar__link_active);

  return (
    <nav className={s.sidebar}>
      <div className={s.sidebar__body}>
        <ul className={s.sidebar__list}>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? linksClass : s.sidebar__link
              }
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
