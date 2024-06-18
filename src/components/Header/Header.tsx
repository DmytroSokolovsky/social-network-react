import { Link } from 'react-router-dom';
import headerLogo from '../../images/header__logo.png';
import headerHuman from '../../images/header_actions.png';
import { useState } from 'react';
import s from './Header.module.scss';
import cn from 'classnames';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  let actionsClass = cn(s.header__actions, s['actions-header'], {
    [s.open]: open,
  });

  return (
    <div className={s.header}>
      <div className={s.header__body}>
        <div className={s.header__column}>
          <Link to="/" className={s.header__logo}>
            <img src={headerLogo} alt="Зображення соціальної мережі" />
          </Link>
        </div>
        <div className={s.header__column}>
          <div className={s.header__human}>
            <img src={headerHuman} alt="" onClick={handleOpen} />
          </div>
          <div className={actionsClass}>
            <div className={s['actions-header__body']}>
              <ul className={s['actions-header__list']}>
                <li>
                  <div className={s['actions-header__login']}>Dmytro</div>
                </li>
                <li>
                  <div className={s['actions-header__exit']}>Exit</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
