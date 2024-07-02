import { useContext } from 'react';
import s from './Error.module.scss';
import { ThemeContext } from '../../context/context';
import cn from 'classnames';

const Error = () => {
  const theme = useContext(ThemeContext);

  let errorClass = cn(s.error, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <div className={errorClass}>
      <span>Page not found</span>
    </div>
  );
};

export default Error;
