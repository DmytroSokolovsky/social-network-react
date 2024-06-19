import { Link } from 'react-router-dom';
import headerLogo from '../../images/header__logo.png';
import headerHuman from '../../images/header_actions.png';
import { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, setAuthUserData } from '../../redux/auth-reducer';
import { getLogin, getLoginStatus } from '../../redux/selectors/auth-selector';
import { Preloader } from '../Preloader/Preloader';
import { Toast } from '../Toast/Toast';
import cn from 'classnames';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const login = useAppSelector(getLogin);
  const loginStatus = useAppSelector(getLoginStatus);

  useEffect(() => {
    dispatch(setAuthUserData());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleExit = () => {
    dispatch(logout());
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
            {loginStatus === 'resolved' ? (
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
              <div className={s.header__singIn}>
                <span>Sing In</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {loginStatus === 'loading' && <Preloader />}
      {loginStatus === 'rejected' && <Toast />}
    </>
  );
};

export default Header;
