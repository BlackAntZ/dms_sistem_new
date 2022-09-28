import classes from "./UsersList.module.css";
import {useCallback, useEffect, useState} from "react";
import ListItem from "./ListItem";
import EditUserModal from "../UI/Modal/User/EditUserModal";
import ItemTable from "../UI/Table/ItemTable";
import UsersFilter from "./UsersFilter";

const UsersList = () => {
  const [users, setUsers] = useState(null);
  const [tags, setTags] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [refresh, setRefresh] = useState(false);

  //Povuci korisnicke podatke po otvaranju stranice
  const fetchData = async () => {
    const res = await fetch("/admin/users");

    if (!res.ok) {
      alert('Greska prilikom povlacenja podataka.');
      return;
    }
    return await res.json();
  }

  useEffect(() => {
    fetchData().then(r => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      const transform = r.users.map(user => {
        const date = new Date(user.datum_rodj);
        return {...user, datum_rodj: date.toLocaleString('en-GB', options)}
      })
      setUsers(transform);
      setTags(r.tags);
    })
  }, [refresh]);

  //Data for the table -- change this
  const [tableData, setTableData] = useState({entries: '10', selectedPage: 1, searchTerm: '', sortTerm: null, sortDir: null});

  //Sort users upon sort term selection - done
  const sortItems = useCallback((sortTerm, sortDir, users) => {
    if (!users) return;
    setFilteredUsers(prevState => {return prevState.sort((a,b) => {
      return (a[sortTerm] > b[sortTerm]) ? -1 * sortDir : ((b[sortTerm] > a[sortTerm]) ? 1 * sortDir : 0);
    })})
  }, []);

  //Function for sorting the table when the sort term inputted - for the table
  const filterListBySearchTerm = useCallback(() => {
    if (!users) return;
    const regexp = new RegExp(tableData.searchTerm, 'gi');
    const filtered = users.filter(item => {
      //change this line
      if (item.ime.match(regexp) || item.prezime.match(regexp) || item.email.match(regexp)) return item;
      return null;
    });

    setFilteredUsers(filtered);
    sortItems(tableData.sortTerm, tableData.sortDir, filtered);
  },[tableData.searchTerm, users, tableData.sortTerm, tableData.sortDir, sortItems]);

  useEffect(() => {
    filterListBySearchTerm();
  }, [filterListBySearchTerm]);

  //Set table data when changed -- change this
  const setTableDataHandler = (type, val) => {
    let transformed;
    if (type === 'entries') {
      transformed = {...tableData, entries: val, selectedPage: 1};
    } else if (type === 'page') {
      transformed = {...tableData, selectedPage: val};
    } else if (type === 'search') {
      transformed = {...tableData, searchTerm: val};
    } else if (type === 'sort') {
      sortItems(val.term, val.dir, filteredUsers);
      transformed = {...tableData, sortDir: val.dir, sortTerm: val.term};
    }
    setTableData(transformed);
  }

  //Table columns -- change this
  const columns = [
    {name: 'korime', sort: true, text: 'Korisnicko ime'},
    {name: 'ime', sort: true, text: 'Ime'},
    {name: 'prezime', sort: true, text: 'Prezime'},
    {name: 'email', sort: true, text: 'Email'},
    {name: 'odjeljenje' ,sort: false, text: 'Odjeljenje'}
  ];

  //Open add/edit user modal
  const openModalHandler = (data = {}) => {
    setOpenModal(true);
    setEditUserData(data);
    setEditUser(!!data.id);
  }

  //Close add/edit user modal
  const closeModalHandler = (refresh = false) => {
    setOpenModal(false);
    refresh && setRefresh(prevState => !prevState);
  }

  return (
    <section className={classes.container}>
      {users && <UsersFilter users={users} tags={tags}></UsersFilter>}
      {openModal && <EditUserModal edit={editUser} data={editUserData} tags={tags} closeModal={closeModalHandler}></EditUserModal>}
      {filteredUsers && <ItemTable setData={setTableDataHandler} items={filteredUsers} {...tableData} columns={columns} addItem={openModalHandler} addText={'Dodaj novog korisnika'}>
        <ListItem openModal={openModalHandler} tableData={tableData} users={filteredUsers}></ListItem>
      </ItemTable>}
    </section>
  )
}

export default UsersList;