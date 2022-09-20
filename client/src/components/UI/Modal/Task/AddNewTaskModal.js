import classes from "./AddNewTaskModal.module.css";
import {useRef, useState} from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import InputModal from "../Templates/InputModal";

const AddNewTaskModal = props => {
  const [formData, setFormData] = useState({naziv: {value: '', error: true}});
  const taskName = useRef();

  const validateInputHandler = (name, data) => {
    const transformData = {};
    transformData[name] = {value: data.term, error: data.error || false};
    return setFormData(prevState => {return {...prevState, ...transformData}});
  }

  const postTaskData = async () => {
    props.closeModal();
    const transformedData = {};
    for (const dataKey in formData) {
      transformedData[dataKey] = formData[dataKey].value;
    }
    const responose = await fetch('admin/task', {
      method: 'POST',
      body: JSON.stringify(transformedData),
      headers : {'Content-Type': 'application/json'}
    })
    return responose.json();
  }

  const submitTaskHandler = ev => {
    ev.preventDefault();
    for (const loginDataKey in formData) {
      if (formData[loginDataKey].error) {
        if (loginDataKey === 'naziv') {
          taskName.current['focus']();
          if (formData[loginDataKey].value.trim().length === 0) taskName.current['empty']();
          return;
        }
      }
    }
    postTaskData().then(r => {
      console.log(r);
      if (r === 'Uspjesno dodano') props.onAdd();
    })
  }

  return (
    <InputModal heading={'Dodaj novi zadatak'} index={'4'} closeModal={props.closeModal}>
      <form onSubmit={submitTaskHandler} className={classes['content']}>
        <Input ref={taskName} onSubmit={validateInputHandler} name='naziv' type='text' label='Naziv zadatka'></Input>
        <Button type='submit' alt={false}>Sacuvaj</Button>
      </form>
    </InputModal>
  )
}

export default AddNewTaskModal;