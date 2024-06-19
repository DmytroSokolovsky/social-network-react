import './App.module.scss';
import s from './App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import { Preloader } from './components/Preloader/Preloader';

const Header = lazy(() => import('./components/Header/Header'));
const Nav = lazy(() => import('./components/Nav/Nav'));
const Chat = lazy(() => import('./components/Chat/Chat'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Users = lazy(() => import('./components/Users/Users'));
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className={s.wrapper}>
          <div className={s.container}>
            <Suspense fallback={<Preloader />}>
              <Header />
              <main className={s.main}>
                <Nav />
                <Routes>
                  <Route path="/" element={<Navigate to={'/profile'} />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/dialogs" element={<Dialogs />} />
                  <Route path="/chat" element={<Chat />} />
                </Routes>
              </main>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;