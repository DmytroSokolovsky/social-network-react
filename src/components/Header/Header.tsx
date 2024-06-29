import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as HeaderLogo } from '../../images/header__logo.svg';
import { useContext, useEffect } from 'react';
import s from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, getAuthUserData } from '../../redux/auth-reducer';
import {
  getIsAuth,
  getLogin,
  getAuthMeStatus,
  getAuthMeErrorMessage,
  getLogoutStatus,
  getLogoutMessage,
} from '../../redux/selectors/auth-selector';
import { Preloader } from '../Preloader/Preloader';
import { Toast } from '../Toast/Toast';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../context/context';

interface HeaderPropsType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  open: boolean;
  setOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header = ({
  menuOpen,
  setMenuOpen,
  open,
  setOpen,
  setTheme,
}: HeaderPropsType) => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(getLogin);
  const authMeStatus = useAppSelector(getAuthMeStatus);
  const authMeErrorMessage = useAppSelector(getAuthMeErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const logoutStatus = useAppSelector(getLogoutStatus);
  const logoutMessage = useAppSelector(getLogoutMessage);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  const handleToggleOpen = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setOpen(prevOpen => !prevOpen);
  };

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleExit = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login', { state: { from: location.pathname } });
      setOpen(prevOpen => !prevOpen);
    }, 200);
  };

  const handleSingIn = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  let actionsClass = cn(s.header__actions, s['actions-header'], {
    [s.open]: open,
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  let menuClass = cn(s.header__menu, {
    [s.active]: menuOpen,
  });

  let headerClass = cn(s.header, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  const handleOpenMenu = () => {
    setMenuOpen(prevOpen => !prevOpen);
  };

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <div className={headerClass}>
        <div className={s.header__body}>
          <div className={s.header__column}>
            <nav className={menuClass} onClick={handleOpenMenu}>
              <span></span>
              <span></span>
              <span></span>
            </nav>
          </div>
          <div className={s.header__column}>
            <Link to="/">
              {theme === 'dark' && (
                <HeaderLogo
                  width="60px"
                  height="60px"
                  style={{ color: '#00d8ff' }}
                  className={s.header__logo}
                />
              )}
              {theme === 'light' && (
                <HeaderLogo
                  width="60px"
                  height="60px"
                  style={{ color: '#087ea4' }}
                  className={s.header__logo}
                />
              )}
            </Link>
          </div>
          <div className={s.header__column}>
            {theme === 'light' && (
              <FontAwesomeIcon
                className={s.header__theme}
                icon={faMoon}
                size="2x"
                onClick={handleChangeTheme}
              />
            )}
            {theme === 'dark' && (
              <FontAwesomeIcon
                className={s.header__theme}
                icon={faSun}
                size="2x"
                onClick={handleChangeTheme}
              />
            )}

            {authMeStatus === 'resolved' && isAuth ? (
              <>
                <FontAwesomeIcon
                  className={s.header__human}
                  icon={faUser}
                  onClick={handleToggleOpen}
                />
                <div className={actionsClass} onClick={handleOpen}>
                  <div className={s['actions-header__body']}>
                    <ul className={s['actions-header__list']}>
                      <li>
                        <div className={s['actions-header__login']}>
                          {login || 'User'}
                        </div>
                      </li>
                      <li>
                        <div className={s['actions-header__exit']}>
                          <span onClick={handleExit}>Exit</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className={s.header__signIn} onClick={handleSingIn}>
                <span>Sign In</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {authMeStatus === 'loading' && <Preloader />}
      {authMeStatus === 'rejected' && (
        <Toast errorMessage={authMeErrorMessage} />
      )}
      {logoutStatus === 'rejected' && <Toast errorMessage={logoutMessage} />}
    </>
  );
};

export default Header;
