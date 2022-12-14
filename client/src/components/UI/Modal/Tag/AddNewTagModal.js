import classes from "./AddNewTagModal.module.css";
import React, {useRef, useState} from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import InputModal from "../Templates/InputModal";

const AddNewTagModal = props => {
  const [formData, setFormData] = useState({parent: {value: `${props.tag}`, error: false}, child: {value: '0', error: false}, naziv: {value: '', error: true}, boja: {value: '', error: true}});
  const [pickedColor, setPickedColor] = useState(false);
  const tagName = useRef();
  const bojaRef = useRef();

  const validateColorHandler = () => {
    setPickedColor(false);
    const transformedData = {...formData, boja: {value: bojaRef.current['value'], error: false}}
    setFormData(transformedData);
  }

  const validateInputHandler = (name, data) => {
    const transformData = {};
    transformData[name] = {value: data.term, error: data.error || false};
    return setFormData(prevState => {return {...prevState, ...transformData}});
  }

  const postTagData = async () => {
    props.closeModal();
    const transformedData = {};
    for (const dataKey in formData) {
      transformedData[dataKey] = formData[dataKey].value;
    }
    const responose = await fetch('admin/tag', {
      method: 'POST',
      body: JSON.stringify(transformedData),
      headers : {'Content-Type': 'application/json'}
    })
    return responose.json();
  }

  const submitTagHandler = ev => {
    ev.preventDefault();
    for (const loginDataKey in formData) {
      if (formData[loginDataKey].error) {
        if (loginDataKey === 'naziv') {
          tagName.current['focus']();
          if (formData[loginDataKey].value.trim().length === 0) tagName.current['empty']();
          return;
        }
        if (loginDataKey === 'boja') {
          setPickedColor(true);
          bojaRef.current['click']();
          return;
        }
      }
    }
    postTagData().then(r => {
      console.log(r);
      if (r === 'Uspjesno dodano') props.onAdd();
    })
  }

  return (
    <InputModal heading={'Dodaj novo odjeljenje'} index={'4'} closeModal={props.closeModal}>
      <form onSubmit={submitTagHandler} className={classes['content']}>
        <Input ref={tagName} onSubmit={validateInputHandler} name='naziv' type='text' label='Naziv odjeljenja'></Input>
        <div className={classes.input_div}>
          <label htmlFor={'boja'}>Odaberi boju</label>
          <input onChange={validateColorHandler} ref={bojaRef} id={'boja'} type={"color"}/>
          {pickedColor && <div className={classes['empty-div']}>{`Odaberite boju!`}</div>}
        </div>
        <Button type='submit' alt={false}>Sacuvaj</Button>
      </form>
    </InputModal>
  )
}

export default AddNewTagModal;