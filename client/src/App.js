import {useCallback, useEffect, useState} from 'react';
import classes from "./App.module.css";
import UsersList from "./components/users/UsersList";
import EntriesAndSearch from "./components/users/EntriesAndSearch";
import PageButtons from "./components/users/PageButtons";
import EditUserModal from "./components/UI/Modal/User/EditUserModal";
import Login from "./components/login/Login";
import DashBoard from "./components/control-panel/DashBoard";
import SideMenu from "./components/UI/SideMeni/SideMenu";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openUsersPage, setOpenUsersPage] = useState(false);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [entries, setEntries] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);
  const [statistics, setStatistics] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTagFilter, setSelectedTagFilter] = useState('0');
  const [mainSectionClasses, setMainSectionClasses] = useState({value: `${classes['main-body']}`, alt: false});


  const fetchData = async () => {
    const res = await fetch("/admin/users");

    if (!res.ok) {
      alert('Greska prilikom povlacenja podataka.');
      return;
    }
    return await res.json();
  }

  //Function for sorting the table when the sort term inputted
  const filterListBySearchTerm = useCallback((array) => {
    const regexp = new RegExp(searchTerm, 'gi');
    return array.filter(user => {
      if (user.name.match(regexp) || user.last_name.match(regexp) || user.email.match(regexp)) return user;
      return null;
    });
  },[searchTerm]);

  //Display the statistics of the presently displayed users—done
  const shownUsersStatistics = useCallback((array, entries) => {
    const transformedData = [];
    transformedData[0] = `${entries * (selectedPage - 1) + 1}`;
    transformedData[1] = `${entries * selectedPage < array.length ? entries * selectedPage : array.length}`;
    transformedData[2] = `${array.length}`;
    setStatistics(transformedData);
  },[selectedPage]);

  //Fill the table with users and sort if the sort term inputted.
  const fillUsersData = useCallback((array, data) => {
    let list;
    (data.searchTerm  ? data.searchTerm : searchTerm.length) === 0 ? list = array : list = filterListBySearchTerm(array);
    if (selectedTagFilter !== '0') {
      list = list.filter(user => {
        if (user.odjeljenja.findIndex(odjeljenje => odjeljenje.id === selectedTagFilter) >= 0) {
          return user;
        }
        return null;
      })
    }

    shownUsersStatistics(list, data.entries ? data.entries : entries);
    setFilteredUsers(list);
    setUsers(array);
  },[entries, selectedTagFilter, searchTerm, filterListBySearchTerm, shownUsersStatistics]);

  const fillTagsData = data => {
    setTags(data);
  }

  useEffect(() => {
    fetchData().then(r => {
      fillUsersData(r.users, {});
      fillTagsData(r.tags);
    })
  }, [fillUsersData]);


  //Sort users upon sort term selection - done
  function sortUsers (sortTerm, sortDir) {
    setUsers(prevState => {return prevState.sort((a,b) => {
      return (a[sortTerm] > b[sortTerm]) ? -1 * sortDir : ((b[sortTerm] > a[sortTerm]) ? 1 * sortDir : 0);
    })})
  }

  const selectEntriesHandler = entries => {
    setEntries(entries);
    setSelectedPage(1);
    fillUsersData(users, {entries: entries});
  }

  const searchHandler = val => {
    setSearchTerm(val);
    fillUsersData(users, {searchTerm: val})
  }

  const selectedPageHandler = number => {
    setSelectedPage(number);
  }

  const sortTableHandler = (term, dir) => {
    sortUsers(term, dir);
  }

  const openModalHandler = (data) => {
    setOpenModal(true);
    setEditUserData(data);
  }

  const closeModalHandler = () => {
    setOpenModal(false);
  }

  const selectedTagHandler = id => {
    setSelectedTagFilter(id);
  }

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
      {openUsersPage && <section className={mainSectionClasses.value}>
        {users && <EntriesAndSearch tagSelect={selectedTagHandler} tags={tags} users={users} onSearch={searchHandler}
                                    entriesSelect={selectEntriesHandler}></EntriesAndSearch>}
        {filteredUsers &&
          <UsersList openModal={openModalHandler} search={searchTerm} users={filteredUsers} entries={entries}
                     selectedPage={selectedPage} onSort={sortTableHandler}></UsersList>}
        {filteredUsers &&
          <PageButtons statistics={statistics} entries={entries} selectedPage={selectedPage} users={filteredUsers}
                       onSelect={selectedPageHandler}></PageButtons>}
        {openModal && <EditUserModal data={editUserData} tags={tags} closeModal={closeModalHandler}></EditUserModal>}
      </section>}
    </>
  );
}

export default App;