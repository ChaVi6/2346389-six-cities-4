import Header from '../components/header/header';
import { useRef, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { loginAction } from '../store/api-actions';
import { AuthData } from '../types/auth-data';
import { Link } from 'react-router-dom';
import { validatePassword } from '../components/const/util';
import { getCityName } from '../store/offers-data/selectors';

const ERROR_MESSAGE = 'Пароль должен содержать как минимум одну букву и одну цифру';

export default function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCityName);
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && validatePassword(passwordRef.current.value)) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      // eslint-disable-next-line no-alert
      alert(ERROR_MESSAGE);
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
