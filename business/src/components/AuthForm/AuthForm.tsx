import { FormEvent, useEffect } from 'react';
import useAuthStore from '../../stores/authStore';

import './authForm.css';
import TextButton from '../TextButton/TextButton';
import agent from '../../services/api/agent';
import authSchema from '../../utils/models/authSchema';
import Loading from '../Loading/Loading';
import { socket } from '../../services/webSocket/ioSocket';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const {
        signInForm,
        onFormChanged,
        clearForm,
        isLoading,
        setIsLoading,
        isShowingLoadingSection,
        setIsShowingLoadingSection,
        errorMessage,
        setErrorMessage,
        isShowingErrorMessage,
        setIsShowingErrorMessage,
        employee,
        setEmployee,
    } = useAuthStore();

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const onSubmit = async () => {
        setIsShowingLoadingSection(true);
        setTimeout(() => setIsLoading(true), 100);

        const { error } = authSchema.validate(signInForm);
        if (error) {
            setErrorMessage(error.toString());
            setIsShowingErrorMessage(true);
            setTimeout(() => {
                setIsShowingErrorMessage(false);
            }, 3000);

            setIsLoading(false);
            setTimeout(() => {
                setIsShowingLoadingSection(false);
            }, 200);
        } else {
            const response = await agent.Authenticate.signIn(signInForm);
            if (typeof response[0] !== 'string') {
                sessionStorage.setItem('employee', JSON.stringify(response.data));
                sessionStorage.setItem('ato', response.token);
                setEmployee(response.data);
                setIsLoading(false);

                socket.emit('joinEmployeeRoom');
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                    clearForm();
                    navigate('/kassa');
                }, 100);
            } else {
                setErrorMessage('Det blev något fel, var god försök igen!');
                setIsShowingErrorMessage(true);
                setTimeout(() => setIsShowingErrorMessage(false), 3000);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                }, 200);
            }
        }
    };

    useEffect(() => {
        if (employee !== null) navigate('/kassa');
    }, []);

    return (
        <>
            {isShowingLoadingSection && <Loading isLoading={isLoading} />}
            <section className={`authentication-form__wrapper`}>
                <h1 className='form-title'>LOGGA IN</h1>
                <p className={`error-message error-message--${isShowingErrorMessage ? 'active' : 'inactive'}`}>
                    {errorMessage}
                </p>
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
        </>
    );
};

export default AuthForm;
