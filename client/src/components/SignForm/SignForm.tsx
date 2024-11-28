import './signForm.css';
import TextButton from '../TextButton/TextButton';
import Loading from '../Loading/Loading';
import useAuthStore from '../../stores/authStore';
import { authSchema, signUpSchema } from '../../utils/models/authSchema';
import { FormEvent, useState } from 'react';
import agent from '../../services/api/agent';
import { AxiosError } from 'axios';
import { Customer } from '../../interfaces/interfaceAuth';
const SignForm = () => {
    const {
        signInForm,
        signUpForm,
        onFormChanged,
        clearForm,
        isLoading,
        setIsLoading,
        isShowingLoadingSection,
        setIsShowingLoadingSection,
        isShowingForm,
        setIsShowingForm,
        isSigningIn,
        setIsSigningIn,
        setCustomer,
    } = useAuthStore();
    const [IsShowingError, setIsShowingError] = useState<boolean>(false);

    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const onToggleForms = () => {
        clearForm();
        setIsSigningIn(!isSigningIn);
    };
    const onPressingBackButton = () => {
        clearForm();
        setIsShowingForm(false);
        setIsSigningIn(true);
    };

    const onSignInSubmit = async () => {
        setIsShowingLoadingSection(true);
        setTimeout(() => setIsLoading(true), 100);

        const { error } = authSchema.validate(signInForm);
        if (error) {
            setIsShowingLoadingSection(false);
            setIsShowingError(true);
            setTimeout(() => setIsShowingError(false), 3000);
        } else {
            const data: Customer | AxiosError = await agent.Authenticate.signIn(signInForm);

            if ((data as Customer).email) {
                sessionStorage.setItem('user', JSON.stringify(data));
                setCustomer(data as Customer);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                    window.location.href = '/profil';
                }, 100);
            } else {
                console.log(data);
                setIsShowingError(true);
                setTimeout(() => setIsShowingError(false), 3000);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                }, 200);
            }
        }
    };

    const onSignUpSubmit = async () => {
        setIsShowingLoadingSection(true);
        setTimeout(() => setIsLoading(true), 100);

        const { error } = signUpSchema.validate(signUpForm);
        if (error) {
            setIsShowingError(true);
            setTimeout(() => setIsShowingError(false), 3000);
            console.log(error);
            setIsLoading(false);
            setTimeout(() => {
                setIsShowingLoadingSection(false);
            }, 200);
        } else {
            const data: Customer | AxiosError = await agent.Authenticate.signUp(signUpForm);
            if ((data as Customer).email) {
                sessionStorage.setItem('user', JSON.stringify(data));
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                    window.location.href = '/profil';
                }, 100);
            } else {
                console.log(data);
                setIsShowingError(true);
                setTimeout(() => setIsShowingError(false), 3000);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                }, 200);
            }
        }
    };

    return (
        <article
            className={`authentication-forms__container authentication-forms__container--${
                isShowingForm ? 'active' : 'inactive'
            }`}>
            {isShowingLoadingSection && <Loading isLoading={isLoading} />}
            <section
                className={`authentication-form__wrapper authentication-form__wrapper--${
                    isSigningIn ? 'active' : 'inactive'
                }`}>
                <h1 className='form-title'>LOGGA IN</h1>
                <p className={`error-message error-message--${IsShowingError ? 'active' : 'inactive'}`}>
                    Det blev något fel, var god försök igen!
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
                            id='signInEmail'
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
                            id='signInPassword'
                            placeholder='Lösenord'
                            value={signInForm.password}
                            onChange={onFormChanged}
                            data-form-type='signIn'
                        />
                    </section>
                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={onSignInSubmit}>LOGGA IN</TextButton>
                        <TextButton onClick={onToggleForms}>SKAPA KONTO</TextButton>
                    </section>
                </form>
                <TextButton onClick={onPressingBackButton}>GÅ TILLBAKA</TextButton>
            </section>
            <section
                className={`authentication-form__wrapper authentication-form__wrapper--${
                    !isSigningIn ? 'active' : 'inactive'
                }`}>
                <h1 className='form-title'>JOIN THE MESS!</h1>
                <p className={`error-message error-message--${IsShowingError ? 'active' : 'inactive'}`}>
                    Det blev något fel, var god försök igen!
                </p>
                <form className={`main-form main-form--active`} onSubmit={FormDefaultPreventer}>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Förnamn'
                            type='text'
                            name='firstName'
                            id='signUpFirstName'
                            value={signUpForm.firstName}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Efternamn'
                            type='text'
                            name='lastName'
                            id='signUpLastName'
                            value={signUpForm.lastName}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Person nummer'
                            type='text'
                            name='socialSecurityNumber'
                            id='signUpSocialSecurityNumber'
                            value={signUpForm.socialSecurityNumber}
                            onChange={onFormChanged}
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
                            id='signUpMail'
                            value={signUpForm.email}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Adress'
                            type='text'
                            name='address'
                            id='signUpAddress'
                            value={signUpForm.address}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Postnr'
                            type='text'
                            name='zipcode'
                            id='signUpZipcode'
                            value={signUpForm.zipcode}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Stad'
                            type='text'
                            name='city'
                            id='signUpCity'
                            value={signUpForm.city}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>
                    <section className='input-section'>
                        {/* <label className='input-label' htmlFor='loginEmail'>
                            Mailadress
                        </label> */}
                        <input
                            className='input-field input-field__text'
                            placeholder='Telefon nummer'
                            type='tel'
                            name='phone'
                            id='signUpPhone'
                            value={signUpForm.phone}
                            onChange={onFormChanged}
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
                            id='signUpPassword'
                            placeholder='Lösenord'
                            value={signUpForm.password}
                            onChange={onFormChanged}
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
                            name='verifyPassword'
                            id='signUpVerifyPassword'
                            placeholder='Verifiera lösenord'
                            value={signUpForm.verifyPassword}
                            onChange={onFormChanged}
                            data-form-type='signUp'
                        />
                    </section>

                    <section className='form-buttons__wrapper'>
                        <TextButton onClick={onSignUpSubmit}>REGISTRERA</TextButton>
                        <TextButton onClick={onToggleForms}>HAR REDAN KONTO</TextButton>
                    </section>
                </form>
                <TextButton onClick={onPressingBackButton}>GÅ TILLBAKA</TextButton>
            </section>
        </article>
    );
};

export default SignForm;
