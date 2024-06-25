import './App.module.scss';
import s from './App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useState } from 'react';
import { Suspense } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';

const Header = lazy(() => import('./components/Header/Header'));
const Nav = lazy(() => import('./components/Nav/Nav'));
const Chat = lazy(() => import('./components/Chat/Chat'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Users = lazy(() => import('./components/Users/Users'));
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));
const Error = lazy(() => import('./components/Error/Error'));

const App = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <div className={s.wrapper} onClick={handleClose}>
          <div className={s.container}>
            <Suspense fallback={<Preloader />}>
              <Header
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                open={open}
                setOpen={setOpen}
              />
              <main className={s.main}>
                <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <Routes>
                  <Route path="/" element={<Navigate to={'/profile'} />} />
                  <Route path="/profile/:userId?" element={<Profile />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/dialogs" element={<Dialogs />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/login" element={<Modal />} />
                  <Route path="*" element={<Error />} />
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
