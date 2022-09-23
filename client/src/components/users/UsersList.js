import classes from "./UsersList.module.css";
import {useEffect, useState} from "react";
import ListItem from "./ListItem";
import EditUserModal from "../UI/Modal/User/EditUserModal";
import ItemTable from "../UI/Table/ItemTable";

const UsersList = props => {
  const [users, setUsers] = useState(null);
  const [tags, setTags] = useState([]);
  const [entries, setEntries] = useState('10');
  const [selectedPage, setSelectedPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});

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
      setUsers(r.users);
      setTags(r.tags);
    })
  }, []);

  //Open add/edit user modal
  const openModalHandler = (data) => {
    setOpenModal(true);
    setEditUserData(data);
  }

  //Close add/edit user modal
  const closeModalHandler = () => {
    setOpenModal(false);
  }

  const selectEntriesHandler = val => {
    setEntries(val);
  }

  const setSelectedPageHandler = num => {
    setSelectedPage(num)
  }

  return (
    <section>
      {openModal && <EditUserModal data={editUserData} tags={tags} closeModal={closeModalHandler}></EditUserModal>}
      {users && <ItemTable onPageSelect={setSelectedPageHandler} onSelectEntries={selectEntriesHandler} items={users} columns={[{name: 'name', sort: true, text: 'Ime'}, {
        name: 'last_name',
        sort: true,
        text: 'Prezime'
      }, {name: 'email', sort: true, text: 'Email'}, {sort: false, text: 'Odjeljenje'}]}>
        {users.map(user => {
          let classes = '';
          if (users.indexOf(user) >= +entries * selectedPage || users.indexOf(user) < +entries * (selectedPage - 1)) classes = 'display-none';
          return <ListItem openModal={openModalHandler} key={user.id} classes={classes} {...user}></ListItem>
        })}
      </ItemTable>}
    </section>
  )
}

export default UsersList;