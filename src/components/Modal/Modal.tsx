import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../redux/auth-reducer';
import { getLoginStatus } from '../../redux/selectors/auth-selector';

interface ModalPropsType {
  setModalOpen: (boolean: boolean) => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Modal = ({ setModalOpen }: ModalPropsType) => {
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
  const loginStatus = useAppSelector(getLoginStatus);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const handleEye = () => {
    setPasswordOpen(prevpasswordOpen => !prevpasswordOpen);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = handleSubmit(data => {
    JSON.stringify(data);
    dispatch(login(data));

    setModalOpen(false);
    reset();
  });

  let signInClass = cn(s.modal__signIn, {
    [s.invalid]: !isValid,
  });

  return createPortal(
    <div className={s.modal}>
      <div className={s.modal__container}>
        <div className={s.modal__body}>
          <div className={s.modal__header}>
            <div className={s.modal__title}>Sign In</div>
            <div className={s.modal__close} onClick={handleClose}></div>
          </div>
          <form onSubmit={onSubmit} className={s.modal__form}>
            <label htmlFor="email" className={s.modal__email}>
              <span>Email:</span>
              <input
                {...register('email', {
                  required: 'Field is required!',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format!',
                  },
                })}
                type="text"
                name="email"
                placeholder="Enter email..."
              />
              {errors?.email && (
                <div className={s.email__error}>
                  {errors?.email?.message || 'Error'}
                </div>
              )}
            </label>
            <label htmlFor="password" className={s.modal__password}>
              <span>Password:</span>
              <div className={s.modal__row}>
                {!passwordOpen && (
                  <input
                    {...register('password', {
                      required: 'Field is required!',
                    })}
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                  />
                )}
                {passwordOpen && (
                  <input
                    {...register('password', {
                      required: 'Field is required!',
                    })}
                    type="input"
                    name="password"
                    placeholder="Enter password..."
                  />
                )}
                {!passwordOpen && (
                  <FontAwesomeIcon icon={faEye} onClick={handleEye} />
                )}
                {passwordOpen && (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleEye} />
                )}
              </div>
              {errors?.password && (
                <div className={s.password__error}>
                  {errors?.password?.message || 'Error'}
                </div>
              )}
            </label>
            <label htmlFor="rememberMe" className={s.modal__rememberMe}>
              <input
                {...register('rememberMe')}
                type="checkbox"
                name="rememberMe"
              />
              <span>Remember me</span>
            </label>
            <button type="submit" className={signInClass}>
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};
