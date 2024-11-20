import { FormEvent, useEffect } from 'react';
import useAuthStore from '../../stores/authStore';

import './authForm.css';
import TextButton from '../TextButton/TextButton';
import agent from '../../services/api/agent';
import authSchema from '../../utils/models/authSchema';

const AuthenticationForm = () => {
    const { signInForm, onFormChanged, validateForm } = useAuthStore();

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onSubmit = async () => {
        try {
            const validate = await authSchema.validateAsync(signInForm);
            validateForm();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        agent.Products.list().then((res) => console.log(res.data));
    }, []);

    return (
        <section className={`authentication-form__wrapper`}>
            <h1 className='form-title'>LOGGA IN</h1>
            <form className={`main-form main-form--active`} onSubmit={FormDefaultPreventer} onChange={onFormChanged}>
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
                <section className='form-buttons__wrapper'>
                    <TextButton onClick={onSubmit}>LOGGA IN</TextButton>
                </section>
            </form>
        </section>
    );
};

export default AuthenticationForm;
