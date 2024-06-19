import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../hooks/hooks';
import { getloginErrorMessage } from '../../redux/selectors/auth-selector';
import cn from 'classnames';
import s from './Toast.module.scss';

export const Toast = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const loginErrorMessage = useAppSelector(getloginErrorMessage);

  let toastClass = cn(s.toast);

  if (seconds > 0) {
    toastClass = cn(s.toast, {
      [s.open]: true,
    });
  }

  if (seconds >= 2.7) {
    toastClass = cn(s.toast, {
      [s.open]: false,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 0.3);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (seconds >= 3) return null;

  return createPortal(
    <div className={toastClass}>
      <span>{loginErrorMessage}</span>
    </div>,
    document.body,
  );
};
