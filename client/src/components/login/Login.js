import classes from "./Login.module.css";
import {useRef, useState} from "react";
import LoginInput from "../UI/Input/LoginInput";
import AdditionalFieldsModal from "./AdditionalFieldsModal";

const Login = props => {
  const [loginData, setLoginData] = useState({korime: {value: '', error: true}, sifra: {value: '', error: true}});
  const [signupData, setSignupData] = useState(
    {ime: {value: '', error: true},
      prezime: {value: '', error: true},
      sign_korime: {value: '', error: true},
      email: {value: '', error: true},
      sifra_sign: {value: '', error: true},
      potvrdasifra: {value: '', error: true},
      grad: {value: '', error: false},
      postanski_broj: {value: '', error: false},
      drzava: {value: '', error: false},
      datum_rodj: {value: '', error: false}}
  );
  const [resetLogin, setResetLogin] = useState(false);
  const [additionalDataModal, setAdditionalDataModal] = useState(false);
  const container = useRef();
  const userNameLogin = useRef();
  const passwordLogin = useRef();
  const nameSignUp = useRef();
  const lastNameSignUp = useRef();
  const userNameSignUp = useRef();
  const emailSignUp = useRef();
  const passwordSignUp = useRef();
  const passwordSignUpConfirm = useRef();

  //Trigger animation when go to signup button is clicked
  const signUpSwitchHandler = () => {
    container.current["classList"].add(classes['sign-up-mode']);
  }

  //Trigger return animation when go to log in button is clicked
  const singInSwitchHandler = () => {
    container.current["classList"].remove(classes['sign-up-mode']);
  }

  //Collect form data from the input fields
  const collectFormDataHandler = (type, name, data) => {
    const transformData = {};
    transformData[name] = {value: data.term, error: data.error || false};
    if (type === 'login') {
      return setLoginData(prevState => {return {...prevState, ...transformData}});
    }
    return setSignupData(prevState => {return {...prevState, ...transformData}});
  }

  //Post fetch request for either login or signup data
  const postFormData = async (data, url) => {
    const transformedData = {};
    for (const dataKey in data) {
      transformedData[dataKey] = data[dataKey].value;
    }
    const response = await fetch(`/${url}`, {
      method: 'POST',
      body: JSON.stringify(transformedData),
      headers : {'Content-Type': 'application/json'}
    })
    return await response.json();
  }

  //Validate data when login button is clicked, and post if validation is passed
  const loginHandler = ev => {
    ev.preventDefault();
    for (const loginDataKey in loginData) {
      if (loginData[loginDataKey].error) {
        if (loginDataKey==='korime') {
          userNameLogin.current['focus']();
          if (loginData[loginDataKey].value.trim().length === 0) userNameLogin.current['empty']();
          return;
        }
        passwordLogin.current['focus']();
        if (loginData[loginDataKey].value.trim().length === 0) passwordLogin.current['empty']();
        return;
      }
    }
    postFormData(loginData, 'login').then(r => {
      if (r === 'Sifra se ne poklapa') {
        console.log(r);
        return;
      }
      console.log(r);
      props.onLogin();
      setLoginData({korime: {value: '', error: true}, sifra: {value: '', error: true}});
      setResetLogin(prevState => !prevState);
    })
  }

  //Validate data when signup button is clicked, and post if validation is passed
  const signinHandler = ev => {
    ev.preventDefault();
    for (const sigunpDataKey in signupData) {
      if (signupData[sigunpDataKey].error) {
        if (sigunpDataKey==='ime') {
          nameSignUp.current['focus']();
          if (signupData[sigunpDataKey].value.trim().length === 0) nameSignUp.current['empty']();
          return;
        } else if (sigunpDataKey==='prezime') {
          lastNameSignUp.current['focus']();
          if (signupData[sigunpDataKey].value.trim().length === 0) lastNameSignUp.current['empty']();
          return;
        } else if (sigunpDataKey==='sign_korime') {
          userNameSignUp.current['focus']();
          if (signupData[sigunpDataKey].value.trim().length === 0) userNameSignUp.current['empty']();
          return;
        } else if (sigunpDataKey==='email') {
          emailSignUp.current['focus']();
          if (signupData[sigunpDataKey].value.trim().length === 0) emailSignUp.current['empty']();
          return;
        } else if (sigunpDataKey==='sifra_sign') {
          passwordSignUp.current['focus']();
          if (signupData[sigunpDataKey].value.trim().length === 0) passwordSignUp.current['empty']();
          return;
        }
        passwordSignUpConfirm.current['focus']();
        if (signupData[sigunpDataKey].value.trim().length === 0) passwordSignUp.current['empty']();
        return;
      }
    }
    postFormData(signupData, 'signup').then(r => {
      console.log(r);
      if (r === 'Korisnik dodan') {
        setSignupData(
          {ime: {value: '', error: true},
            prezime: {value: '', error: true},
            sign_korime: {value: '', error: true},
            email: {value: '', error: true},
            sifra_sign: {value: '', error: true},
            potvrdasifra: {value: '', error: true},
            grad: {value: '', error: false},
            postanski_broj: {value: '', error: false},
            drzava: {value: '', error: false},
            datum_rodj: {value: '', error: false}}
        );
        container.current["classList"].remove(classes['sign-up-mode']);
        setResetLogin(prevState => !prevState);
      }
    });
  }

  //Select password field and display an error if it is empty
  const selectPasswordHandler = () => {
    passwordSignUp.current['focus']();
    if (signupData.sifra_sign.value.trim().length === 0) passwordSignUp.current['empty']();
  }

  //Open modal for additional registration data
  const openAdditionalFieldsModalHandler = () => {
    setAdditionalDataModal(true);
  }

  const closeAdditionalFieldsModalHandler = (data) => {
    setAdditionalDataModal(false);
    const transformData = {...signupData, ...data};
    setSignupData(transformData);
  }

  const signupArguments = {
    must: true,
    reset: resetLogin,
    onChange: collectFormDataHandler,
    alt: true
  }

  return (
    <div ref={container} className={classes['container']}>
      {additionalDataModal && <AdditionalFieldsModal closeModal={closeAdditionalFieldsModalHandler}></AdditionalFieldsModal>}
      <div className={classes["forms-container"]}>
        <div className={classes["signin-signup"]}>
          <form onSubmit={loginHandler} className={classes["sign-in-form"]}>
            <h2 className={classes["title"]}>Prijavite se</h2>
            <LoginInput reset={resetLogin} ref={userNameLogin} value={loginData.korime.value} name={'korime'} id={'korime'} onChange={collectFormDataHandler} type={'text'} placeholder={'Korisničko ime'} class={'bxs-user'}></LoginInput>
            <LoginInput reset={resetLogin} ref={passwordLogin} value={loginData.sifra.value} name={'sifra'} id={'sifra'} onChange={collectFormDataHandler} type={'password'} placeholder={'Šifra'} class={'bxs-lock-alt'}></LoginInput>
            <button type={"submit"} className={`${classes["btn"]} ${classes['flex']}`}>Prijavi se</button>
            <p className={classes["social-text"]}></p>
          </form>
          <form onSubmit={signinHandler} className={classes["sign-up-form"]}>
            <h2 className={classes["title"]}>Napravi novi nalog</h2>
            <LoginInput {...signupArguments} ref={nameSignUp} value={signupData.ime.value}  name={'ime'} type={'text'} placeholder={'Ime'} class={'bxs-user'}></LoginInput>
            <LoginInput {...signupArguments} ref={lastNameSignUp} value={signupData.prezime.value} name={'prezime'} type={'text'} placeholder={'Prezime'} class={'bxs-user'}></LoginInput>
            <LoginInput {...signupArguments} ref={userNameSignUp} value={signupData.sign_korime.value} name={'sign_korime'} type={'text'} placeholder={'Korisničko ime korisnika'} class={'bxs-user-pin'}></LoginInput>
            <LoginInput {...signupArguments} ref={emailSignUp} value={signupData.email.value} name={'email'} type={'email'} placeholder={'Email'} class={'bxs-envelope'}></LoginInput>
            <LoginInput {...signupArguments} ref={passwordSignUp} value={signupData.sifra_sign.value} name={'sifra_sign'} type={'password'} placeholder={'Šifra'} class={'bxs-lock-alt'}></LoginInput>
            <LoginInput {...signupArguments} sifra={signupData.sifra_sign.value} selectPw={selectPasswordHandler}
                        ref={passwordSignUpConfirm} value={signupData.potvrdasifra.value} name={'potvrdasifra'} type={'password'}
                        placeholder={'Ponovo unesite šifru'} class={'bxs-lock-alt'}></LoginInput>
            <div onClick={openAdditionalFieldsModalHandler} className={classes['additional_fields_button']}>Otvori dodatna polja <i className='bx bx-down-arrow'></i></div>
            <button type={"submit"} className={`${classes["btn"]} ${classes['flex']}`}>Registruj se</button>
            <p className={classes["social-text"]}></p>
          </form>
        </div>
      </div>
      <div className={classes["panels-container"]}>
        <div className={`${classes["panel"]} ${classes['left-panel']}`}>
          <div className={classes["content"]}>
            <h3>Novi ste?</h3>
            <p>
              Ukoliko ne posjedujete nalog, napravite novi nalog klikom na dugme ispod.
            </p>
            <button onClick={signUpSwitchHandler} className={`${classes["btn"]} ${classes['transparent']}`} id="sign-up-btn">
              Registruj se
            </button>
          </div>
          <img src={"log.svg"} className={classes["image"]} alt=""/>
        </div>
        <div className={`${classes["panel"]} ${classes['right-panel']}`}>
          <div className={classes["content"]}>
            <h3>Imate nalog?</h3>
            <p>
              Ukoliko već posjedujete nalog možete da se prijavite u aplikaciju klikom na dugme ispod.
            </p>
            <button onClick={singInSwitchHandler} className={`${classes["btn"]} ${classes['transparent']}`} id="sign-in-btn">
              Prijavi se
            </button>
          </div>
          <img src={'register.svg'} className={classes["image"]} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Login;