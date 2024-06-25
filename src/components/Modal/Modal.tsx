import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../redux/auth-reducer';
import {
  getLoginMessage,
  getLoginStatus,
  getCaptchaUrl,
  getCaptchaStatus,
  getCaptchaErrorMessage,
} from '../../redux/selectors/auth-selector';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

const Modal = () => {
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
  const loginStatus = useAppSelector(getLoginStatus);
  const loginMessage = useAppSelector(getLoginMessage);
  const captchaUrl = useAppSelector(getCaptchaUrl);
  const captchaStatus = useAppSelector(getCaptchaStatus);
  const captchaErrorMessage = useAppSelector(getCaptchaErrorMessage);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const handleEye = () => {
    setPasswordOpen(prevpasswordOpen => !prevpasswordOpen);
  };

  const from = location.state?.from || '/';

  const handleClose = () => {
    navigate(from, { replace: true });
  };

  const onSubmit = handleSubmit(data => {
    JSON.stringify(data);
    dispatch(login(data));

    if (loginStatus === 'resolved') {
      navigate(from, { replace: true });
      reset();
    }
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
                <div className={s.error}>
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
                <div className={s.error}>
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
            {captchaUrl && (
              <label htmlFor="captcha" className={s.modal__captcha}>
                <img src={captchaUrl} alt="Captcha" />
                <input
                  {...register('captcha', {
                    required: 'Field is required!',
                  })}
                  type="input"
                  name="captcha"
                  placeholder="Enter numbers from the image..."
                />
                {errors?.captcha && (
                  <div className={s.error}>
                    {errors?.captcha?.message || 'Error'}
                  </div>
                )}
              </label>
            )}
            <button type="submit" className={signInClass}>
              <span>Sign In</span>
            </button>
            {loginStatus === 'rejected' && (
              <div className={s.error}>{loginMessage}</div>
            )}
            {captchaStatus === 'rejected' && (
              <div className={s.error}>{captchaErrorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
