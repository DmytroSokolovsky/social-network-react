import { CSSProperties, ReactNode, useContext } from 'react';
import s from './MyButton.module.scss';
import cn from 'classnames';
import { ThemeContext } from '../../../context/context';

interface MyButtonPropsType {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const MyButton = ({
  children,
  onClick,
  style,
  type,
  className,
  disabled,
}: MyButtonPropsType) => {
  const theme = useContext(ThemeContext);

  let myButtonClass = cn(s.myButton, className, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  return (
    <button
      className={myButtonClass}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};
