import { Link } from 'react-router-dom';
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
import { Modal } from '../Modal/Modal';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const login = useAppSelector(getLogin);
  const authMeStatus = useAppSelector(getAuthMeStatus);
  const authMeErrorMessage = useAppSelector(getAuthMeErrorMessage);
  const isAuth = useAppSelector(getIsAuth);

  const logoutStatus = useAppSelector(getLogoutStatus);
  const logoutMessage = useAppSelector(getLogoutMessage);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleExit = () => {
    dispatch(logout());
    setOpen(prevOpen => !prevOpen);
  };

  const handleSingIn = () => {
    setModalOpen(true);
  };

  let actionsClass = cn(s.header__actions, s['actions-header'], {
    [s.open]: open,
  });

  return (
    <>
      <div className={s.header}>
        <div className={s.header__body}>
          <div className={s.header__column}>
            <Link to="/" className={s.header__logo}>
              <img src={headerLogo} alt="Зображення соціальної мережі" />
            </Link>
          </div>
          <div className={s.header__column}>
            {authMeStatus === 'resolved' && isAuth ? (
              <>
                <div className={s.header__human}>
                  <img src={headerHuman} alt="" onClick={handleOpen} />
                </div>
                <div className={actionsClass}>
                  <div className={s['actions-header__body']}>
                    <ul className={s['actions-header__list']}>
                      <li>
                        <div className={s['actions-header__login']}>
                          {login || 'User'}
                        </div>
                      </li>
                      <li>
                        <div
                          className={s['actions-header__exit']}
                          onClick={handleExit}
                        >
                          Exit
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
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      {logoutStatus === 'rejected' && <Toast errorMessage={logoutMessage} />}
    </>
  );
};

export default Header;
