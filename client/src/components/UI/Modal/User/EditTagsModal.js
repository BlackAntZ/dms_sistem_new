import classes from "./EditTagsModal.module.css";
import Button from "../../Button/Button";
import {useCallback, useEffect, useState} from "react";
import ConfirmModal from "../Templates/ConfirmModal";
import InputModal from "../Templates/InputModal";
import ToolTip from "../../Tooltip/ToolTip";


const EditTagsModal = props => {
  const [selectedTag, setSelectedTag] = useState(props.userTags[0].id);
  const [selectedParent, setSelectedParent] = useState(props.userTags[0].parent);
  const [editedTags, setEditedTags] = useState(props.userTags);
  const [tagsWereEdited, setTagsWereEdited] = useState(false);

  const selectTagHandler = (ev) => {
    setSelectedTag(ev.target.dataset.id);
    setSelectedParent(ev.target.dataset.parentId);
  }

  const submitFormHandler = ev => {
    ev.preventDefault();
  }

  const [location, setLocation] = useState(null);
  const [tagsCheck, setTagsCheck] = useState([]);

  const checkedHandler = () => {
    props.onAddEdit();
  }

  const openFolderHandler = ev => {
    setSelectedParent(ev.target.dataset.id);
    setSelectedTag(0);
  }

  const drawTagCheckboxes = useCallback(parentId => {
    let tagsList = [];
    tagsList.push(
      <div className={classes['check_list_item']} key={'headings'}>
        <div>Naziv</div>
        <div>Opcije</div>
      </div>
    );
    tagsList.push(
      <div key={'check_list_div'} className={classes['check_list_div']}>
        {props.tags.map(tag => {
          if (tag.parent === parentId) {
            const userTagCheck = props.userTags.findIndex(tagI => tagI.id === tag.id) !== -1;
            return (
              <div key={tag.id} className={`${classes['check_list_item']} ${userTagCheck ? classes['check_list_item__selected'] : ''}`}>
                <div>{tag.naziv}</div>
                <div>
                  {tag.child !== '0' && <ToolTip text={"Otvori pododjeljenja"}>
                    <i onClick={openFolderHandler} data-id={tag.id} className='bx bxs-folder-open'></i>
                  </ToolTip>}
                  {!userTagCheck && <ToolTip text={"Dodijeli korisniku"}>
                    <i onClick={checkedHandler} className='bx bxs-plus-circle'></i>
                  </ToolTip>}
                  {userTagCheck && <ToolTip text={"Uredi korisnicko odjeljenje"}>
                    <i onClick={checkedHandler} className='bx bxs-edit'></i>
                  </ToolTip>}
                </div>
              </div>
            )
          }
          return null;
        })}
      </div>
    )
    setTagsCheck(tagsList);
  },[editedTags, props.tags, props.userTags]);

  const locationRecursion = useCallback((id, content = []) => {
    if (id === '0') {
      content.unshift({id: 0, name: 'Home'});
      return content;
    }
    const currentIndex = props.tags.findIndex(tag => tag.id === id);
    content.unshift({id: id, name: props.tags[currentIndex].naziv});
    return locationRecursion(props.tags[currentIndex].parent, content);
  },[props.tags]);

  const drawTagLocation = useCallback(() => {
    const parentId = selectedParent || props.tags[props.tags.findIndex(tag => tag.id === selectedTag)].parent;
    const transformData = locationRecursion(parentId).map(loca => {
      return (
        <div key={loca.id}>
          <span>/</span><span onClick={changeLocationHandler} data-id={loca.id} className='cursor-pointer'>{loca.name}</span>
        </div>
      )
    });
    setLocation(transformData);
    drawTagCheckboxes(parentId);
  }, [selectedParent, selectedTag, drawTagCheckboxes,locationRecursion, props.tags]);

  useEffect(()=> {
    drawTagLocation();
  }, [selectedTag, drawTagLocation]);

  const changeLocationHandler = ev => {
    setSelectedParent(ev.target.dataset.id >= 0 ? ev.target.dataset.id : '0');
    setSelectedTag(0);
  }

  const confirmCloseModal = () => {
    if (tagsWereEdited) {
      openConfirmHandler();
    }
    else {
      props.closeModal();
    }
  }
  const [openConfirm, setOpenConfirm] = useState(false);

  const openConfirmHandler = () => {
    setOpenConfirm(true);
  }

  const closeConfirmHandler = () => {
    setOpenConfirm(false);
  }

  return (
    <InputModal heading={'Uredi korisnicka odjeljenja'} index={'5'} closeModal={confirmCloseModal}>
      {openConfirm && <ConfirmModal index={'6'} closeModal={props.closeModal} cancelClose={closeConfirmHandler}></ConfirmModal>}
      <form onSubmit={submitFormHandler}>
        <div className={classes['tag-buttons']}>
          {editedTags && editedTags.map(tag =>
            <button data-id={tag.id} data-parent-id={tag.parent} onClick={selectTagHandler} className={`${classes['tag-button']} ${selectedTag === tag.id ? classes['tag-selected'] : ''}`} key={tag.id}>
              <i data-id={tag.id} data-parent-id={tag.parent} style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
            </button>
          )}
        </div>
        <div className={classes['tags-div']}>
          <div className={classes['tags-location']}>
            {location}
          </div>
          <div className={classes['check-div']}>
            {tagsCheck}
          </div>
        </div>
        <div className={classes['buttons-div']}>
          <Button type='submit' alt={false} >Sacuvaj</Button>
        </div>
      </form>
    </InputModal>
  )
}

export default EditTagsModal;