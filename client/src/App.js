import {useState} from 'react';
import classes from "./App.module.css";
import UsersList from "./components/users/UsersList";
import Login from "./components/login/Login";
import DashBoard from "./components/control-panel/DashBoard";
import SideMenu from "./components/UI/SideMeni/SideMenu";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openUsersPage, setOpenUsersPage] = useState(false);
  const [mainSectionClasses, setMainSectionClasses] = useState({value: `${classes['main-body']}`, alt: false});

  const loginUserHandler = () => {
    setLoggedIn(true);
  }

  const logoutUserHandler = () => {
    setLoggedIn(false);
  }

  const openUsersPageHandler = () => {
    setOpenUsersPage(true);
  }

  const openStartPageHandler = () => {
    setOpenUsersPage(false);
  }

  const toggleSidebarHandler = () => {
    mainSectionClasses.alt ? setMainSectionClasses({value: `${classes['main-body']}`, alt: false}) : setMainSectionClasses({value: `${classes['main-body']} ${classes['main-alt']}`, alt: true});
  }

  return (
    <>
      {!loggedIn && <section>
        <Login onLogin={loginUserHandler}></Login>
      </section>}
      {loggedIn && <SideMenu toggleSidebar={toggleSidebarHandler} onLogout={logoutUserHandler} openStartPage={openStartPageHandler} onOpenUsers={openUsersPageHandler}></SideMenu>}
      {!openUsersPage && loggedIn && <section className={mainSectionClasses.value}>
        <DashBoard></DashBoard>
      </section>}
      {openUsersPage && loggedIn && <section className={mainSectionClasses.value}>
        <UsersList></UsersList>
      </section>}
    </>
  )
}

export default App;