import { createPortal } from 'react-dom';
import preloader from './../../images/preloader.gif';
import s from './Preloader.module.scss';

export const Preloader = () => {
  return createPortal(
    <div className={s.preloader}>
      <img src={preloader} alt="Зображення завантаження" />
    </div>,
    document.body,
  );
};
