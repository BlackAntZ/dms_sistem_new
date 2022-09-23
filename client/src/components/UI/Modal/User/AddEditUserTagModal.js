import Button from "../../Button/Button";
import classes from "../Task/AddNewTaskModal.module.css";
import InputModal from "../Templates/InputModal";
import React, {useState} from "react";

const AddEditUserTagModal = props => {
  const [formData, setFormData] = useState({});

  const validateInputHandler = (name, data) => {
    //   const transformData = {};
    //   transformData[name] = {value: data.term, error: data.error || false};
    //   return setFormData(prevState => {return {...prevState, ...transformData}});
  }
  //
  // const postTagData = async () => {
  //   props.closeModal();
  //   const transformedData = {};
  //   for (const dataKey in formData) {
  //     transformedData[dataKey] = formData[dataKey].value;
  //   }
  //   const responose = await fetch('admin/tag', {
  //     method: 'POST',
  //     body: JSON.stringify(transformedData),
  //     headers : {'Content-Type': 'application/json'}
  //   })
  //   return responose.json();
  // }
  //
  const submitTagHandler = ev => {
    ev.preventDefault();
    //   for (const loginDataKey in formData) {
    //     if (formData[loginDataKey].error) {
    //       if (loginDataKey === 'naziv') {
    //         tagName.current['focus']();
    //         if (formData[loginDataKey].value.trim().length === 0) tagName.current['empty']();
    //         return;
    //       }
    //       if (loginDataKey === 'boja') {
    //         setPickedColor(true);
    //         bojaRef.current['click']();
    //         return;
    //       }
    //     }
    //   }
    //   postTagData().then(r => {
    //     console.log(r);
    //     if (r === 'Uspjesno dodano') props.onAdd();
    //   })
  }

  return (
    <InputModal heading={'Dodijeli odjeljenje korisniku'} index={'7'} closeModal={props.closeModal}>
      <form onSubmit={submitTagHandler} className={classes['content']}>
        <div className={classes['buttons_div']}>
          <Button type='submit' alt={false}>Sacuvaj</Button>
        </div>
      </form>
    </InputModal>
  )
}

export default AddEditUserTagModal;