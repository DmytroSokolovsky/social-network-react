import { createPortal } from 'react-dom';
import preloader from './../../images/preloader.gif';
import s from './Preloader.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../context/context';
import cn from 'classnames';

export const Preloader = () => {
  const theme = useContext(ThemeContext);

  let preloaderClass = cn(s.preloader, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return createPortal(
    <div className={preloaderClass}>
      <img src={preloader} alt="Зображення завантаження" />
    </div>,
    document.body,
  );
};
