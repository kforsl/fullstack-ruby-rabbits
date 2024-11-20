import { FormEvent, useEffect } from 'react';
import useAuthStore from '../../stores/authStore';

import './authForm.css';
import TextButton from '../TextButton/TextButton';
import agent from '../../services/api/agent';
import authSchema from '../../utils/models/authSchema';

const AuthForm = () => {
    const { signInForm, onFormChanged } = useAuthStore();

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onSubmit = async () => {
        const { error, value } = authSchema.validate(signInForm);
        if (error) {
            console.log('ERROR: ', error);
        } else {
            const data = await agent.Authenticate(signInForm);
            if (typeof data === 'object') {
                console.log('SUCCESS: ');
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = '/kassa';
            }
        }
    };

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) window.location.href = '/kassa';
    }, []);

    return (
        <section className={`authentication-form__wrapper`}>
            <h1 className='form-title'>LOGGA IN</h1>
            <form className={`main-form main-form--active`} onSubmit={FormDefaultPreventer}>
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
                        onChange={onFormChanged}
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
                        onChange={onFormChanged}
                        data-form-type='signIn'
                    />
                </section>
                <section className='form-buttons__wrapper'>
                    <TextButton onClick={onSubmit}>LOGGA IN</TextButton>
                </section>
            </form>
        </section>
    );
};

export default AuthForm;
