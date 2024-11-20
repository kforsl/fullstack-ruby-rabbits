import { FormEvent, useRef } from 'react';
import useAuthStore from '../../stores/authStore';

import './authenticationForm.css';
import TextButton from '../TextButton/TextButton';

const AuthenticationForm = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const {
        signInForm,
        isSigningIn,
        setIsSigningIn,
        signUpForm,
        onFormChanged,
        clearForm,
        isShowingForm,
        setIsShowingForm,
    } = useAuthStore();

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onSubmit = () => {
        console.log('submit');
    };

    const onContinueAsGuest = () => {
        setIsShowingForm(false);
        setTimeout(() => {
            setIsSigningIn(true);
            clearForm('signIn');
            clearForm('signUp');
        }, 200);
    };

    return (
        <section
            className={`authentication-form__backdrop authentication-form__backdrop--${
                isShowingForm ? 'active' : 'inactive'
            }`}>
            <dialog ref={dialogRef} className='authentication-form__wrapper'>
                <h1 className='form-title'>{isSigningIn ? 'LOGGA IN' : 'REGISTRERA'}</h1>
                <form
                    className={`main-form main-form--${isSigningIn ? 'active' : 'inactive'}`}
                    onSubmit={FormDefaultPreventer}
                    onChange={onFormChanged}>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Mailadress'
                            type='email'
                            name='email'
                            id='loginEmail'
                            value={signInForm.email}
                            data-form-type='signIn'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            Lösenord
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='password'
                            id='loginPassword'
                            placeholder='Lösenord'
                            value={signInForm.password}
                            data-form-type='signIn'
                        />
                    </section>

                    <a onClick={() => onContinueAsGuest()} className='form-subtitle'>
                        FORTSÄTT SOM GÄST
                    </a>
                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={onSubmit}>LOGGA IN</TextButton>
                        <TextButton
                            onClick={() => {
                                setIsSigningIn(false);
                                clearForm('signIn');
                            }}>
                            REGISTRERA
                        </TextButton>
                    </section>
                </form>

                <form
                    className={`main-form main-form--${!isSigningIn ? 'active' : 'inactive'}`}
                    onSubmit={FormDefaultPreventer}
                    onChange={onFormChanged}>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='firstName'>
                            Förnamn
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Förnamn'
                            type='text'
                            name='firstName'
                            id='registerFirstName'
                            value={signUpForm.firstName}
                            tabIndex={0}
                            data-form-type='signUp'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='lastName'>
                            Efternamn
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Efternamn'
                            type='text'
                            name='lastName'
                            id='registerLastName'
                            value={signUpForm.lastName}
                            tabIndex={1}
                            data-form-type='signUp'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Mailadress'
                            type='email'
                            name='email'
                            id='registerEmail'
                            value={signUpForm.email}
                            tabIndex={2}
                            data-form-type='signUp'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            Lösenord
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='password'
                            id='registerPassword'
                            placeholder='Lösenord'
                            value={signUpForm.password}
                            tabIndex={3}
                            data-form-type='signUp'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            Verifiera lösenord
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='confirmPassword'
                            id='registerConfirmPassword'
                            placeholder='Verifiera lösenord'
                            value={signUpForm.confirmPassword}
                            tabIndex={4}
                            data-form-type='signUp'
                        />
                    </section>

                    <a onClick={() => onContinueAsGuest()} className='form-subtitle'>
                        FORTSÄTT SOM GÄST
                    </a>
                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={onSubmit}>REGISTRERA</TextButton>
                        <TextButton
                            onClick={() => {
                                setIsSigningIn(true);
                                clearForm('signUp');
                            }}>
                            GÅ TILL INLOGG
                        </TextButton>
                    </section>
                </form>
            </dialog>
        </section>
    );
};

export default AuthenticationForm;
