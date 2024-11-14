import { FormEvent, useRef, useState } from 'react';

import './authenticationForm.css';
import TextButton from '../TextButton/TextButton';

interface Props {
    isShowing: boolean;
    onCancel?: () => void;
}

const AuthenticationForm = ({ isShowing, onCancel }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [showLogin, setShowLogin] = useState(true);

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const OnSubmit = () => {
        console.log('submit');
    };

    const OnContinueAsGuest = () => {
        if (onCancel) onCancel();
        setTimeout(() => {
            setShowLogin(true);
        }, 200);
    };

    return (
        <section
            className={`authentication-form__backdrop authentication-form__backdrop--${
                isShowing ? 'active' : 'inactive'
            }`}>
            <dialog ref={dialogRef} className='authentication-form__wrapper'>
                <h1 className='form-title'>{showLogin ? 'LOGGA IN' : 'REGISTRERA'}</h1>
                <form
                    className={`main-form main-form--${showLogin ? 'active' : 'inactive'}`}
                    onSubmit={FormDefaultPreventer}>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            MAILADRESS
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='MAILADRESS'
                            type='email'
                            name='email'
                            id='loginEmail'
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            LÖSENORD
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='password'
                            id='loginPassword'
                            placeholder='LÖSENORD'
                        />
                    </section>

                    <a onClick={() => OnContinueAsGuest()} className='form-subtitle'>
                        FORTSÄTT SOM GÄST
                    </a>
                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={OnSubmit}>LOGGA IN</TextButton>
                        <TextButton onClick={() => setShowLogin(false)}>REGISTRERA</TextButton>
                    </section>
                </form>

                <form
                    className={`main-form main-form--${!showLogin ? 'active' : 'inactive'}`}
                    onSubmit={FormDefaultPreventer}>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='firstName'>
                            FÖRNAMN
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='FÖRNAMN'
                            type='text'
                            name='firstName'
                            id='registerFirstName'
                            tabIndex={0}
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='lastName'>
                            EFTERNAMN
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='EFTERNAMN'
                            type='text'
                            name='lastName'
                            id='registerLastName'
                            tabIndex={1}
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            MAILADRESS
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='MAILADRESS'
                            type='email'
                            name='email'
                            id='registerEmail'
                            tabIndex={2}
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            LÖSENORD
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='password'
                            id='registerPassword'
                            placeholder='LÖSENORD'
                            tabIndex={3}
                        />
                    </section>

                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginPassword'>
                            LÖSENORD
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            type='password'
                            name='confirmPassword'
                            id='registerConfirmPassword'
                            placeholder='VERIFIERA LÖSENORD'
                            tabIndex={4}
                        />
                    </section>

                    <a onClick={() => OnContinueAsGuest()} className='form-subtitle'>
                        FORTSÄTT SOM GÄST
                    </a>
                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={OnSubmit}>REGISTRERA</TextButton>
                        <TextButton onClick={() => setShowLogin(true)}>GÅ TILL INLOGG</TextButton>
                    </section>
                </form>
            </dialog>
        </section>
    );
};

export default AuthenticationForm;
