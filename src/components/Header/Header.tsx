import { Link, useLocation, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/header__logo.png';
import headerHuman from '../../images/header_actions.png';
import { useEffect, useState } from 'react';
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

interface HeaderPropsType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  open: boolean;
  setOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
}

const Header = ({ menuOpen, setMenuOpen, open, setOpen }: HeaderPropsType) => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(getLogin);
  const authMeStatus = useAppSelector(getAuthMeStatus);
  const authMeErrorMessage = useAppSelector(getAuthMeErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const logoutStatus = useAppSelector(getLogoutStatus);
  const logoutMessage = useAppSelector(getLogoutMessage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  const handleToggleOpen = (e: React.MouseEvent<HTMLImageElement>) => {
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
    }, 100);
  };

  const handleSingIn = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  let actionsClass = cn(s.header__actions, s['actions-header'], {
    [s.open]: open,
  });

  let menuClass = cn(s.header__menu, {
    [s.active]: menuOpen,
  });

  const handleOpenMenu = () => {
    setMenuOpen(prevOpen => !prevOpen);
  };

  return (
    <>
      <div className={s.header}>
        <div className={s.header__body}>
          <div className={s.header__column}>
            <nav className={menuClass} onClick={handleOpenMenu}>
              <span></span>
              <span></span>
              <span></span>
            </nav>
          </div>
          <div className={s.header__column}>
            <Link to="/" className={s.header__logo}>
              <img src={headerLogo} alt="React-application" />
            </Link>
          </div>
          <div className={s.header__column}>
            {authMeStatus === 'resolved' && isAuth ? (
              <>
                <div className={s.header__human}>
                  <img src={headerHuman} alt="" onClick={handleToggleOpen} />
                </div>
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
