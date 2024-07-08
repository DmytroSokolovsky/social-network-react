import './App.scss';
import s from './App.module.scss';
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeContext } from './context/context';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

const Profile = lazy(() => import('./components/Profile/Profile'));
const Users = lazy(() => import('./components/Users/Users'));
const Chat = lazy(() => import('./components/Chat/Chat'));
const Error = lazy(() => import('./components/Error/Error'));

const App = () => {
  const [theme, setTheme] = useLocalStorage('dark', 'theme');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }
  }, [theme]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [menuOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <HashRouter>
          <div className={s.wrapper} onClick={handleClose}>
            <div className={s.container}>
              <Suspense fallback={<Preloader />}>
                <Header
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                  open={open}
                  setOpen={setOpen}
                  setTheme={setTheme}
                />
                <main className={s.main}>
                  <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                  <Routes>
                    <Route path="/" element={<Navigate to={'/profile'} />} />
                    <Route path="/profile/:userId?" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/login" element={<Modal />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </main>
              </Suspense>
            </div>
          </div>
        </HashRouter>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
