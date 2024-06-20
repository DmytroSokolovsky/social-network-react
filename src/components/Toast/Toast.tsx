import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import s from './Toast.module.scss';

interface ToastPropsType {
  errorMessage: string | null;
}

export const Toast = ({ errorMessage }: ToastPropsType) => {
  const [seconds, setSeconds] = useState<number>(0);

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
      <span>{errorMessage}</span>
    </div>,
    document.body,
  );
};
