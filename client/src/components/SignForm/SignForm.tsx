import './signForm.css';
import TextButton from '../TextButton/TextButton';
import Loading from '../Loading/Loading';
import useAuthStore from '../../stores/authStore';
import { authSchema, signUpSchema } from '../../utils/models/authSchema';
import { FormEvent, useEffect, useState } from 'react';
import agent from '../../services/api/agent';
import { AxiosError } from 'axios';
import { Customer, FormInputs, tokenResponse } from '../../interfaces/interfaceAuth';
import { useNavigate } from 'react-router-dom';
import SignFormInput from '../SignFormInput/SignFormInput';
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
    const [IsStartingToShow, setIsStartingToShow] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isShowingForm) {
            setTimeout(() => {
                setIsStartingToShow(true);
            }, 1);
        }
    }, [isShowingForm]);
    useEffect(() => {
        if (!IsStartingToShow) {
            setTimeout(() => {
                setIsShowingForm(false);
            }, 200);
        }
    }, [IsStartingToShow]);
    const FormDefaultPreventer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const onToggleForms = () => {
        clearForm();
        setIsSigningIn(!isSigningIn);
    };
    const onPressingBackButton = () => {
        clearForm();
        setIsStartingToShow(false);
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
            const response: tokenResponse = (await agent.Authenticate.signIn(signInForm)) as tokenResponse;

            if (response !== null) {
                console.log(response);
                sessionStorage.setItem('user', JSON.stringify(response.data));
                sessionStorage.setItem('ato', response.token);
                clearForm();
                setCustomer(response.data as Customer);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                    setIsShowingForm(false);
                    navigate('/profil');
                }, 100);
            } else {
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

            setIsLoading(false);
            setTimeout(() => {
                setIsShowingLoadingSection(false);
            }, 200);
        } else {
            const data: Customer | AxiosError = await agent.Authenticate.signUp(signUpForm);
            if ((data as Customer).email) {
                sessionStorage.setItem('user', JSON.stringify(data));
                setIsLoading(false);
                clearForm();
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                    setIsShowingForm(false);
                    navigate('/profil');
                }, 100);
            } else {
                setIsShowingError(true);
                setTimeout(() => setIsShowingError(false), 3000);
                setIsLoading(false);
                setTimeout(() => {
                    setIsShowingLoadingSection(false);
                }, 200);
            }
        }
    };

    interface FormsTypes {
        signIn: FormInputs[];
        register: FormInputs[];
    }

    const formInputs: FormsTypes = {
        signIn: [
            {
                inputName: 'email',
                placeholder: 'Mailadress',
                type: 'email',
                inputId: 'signInEmail',
                value: signInForm.email,
            },
            {
                inputName: 'password',
                placeholder: 'Lösenord',
                type: 'password',
                inputId: 'signInPassword',
                value: signInForm.password as string,
            },
        ],
        register: [
            {
                inputName: 'firstName',
                placeholder: 'Förnamn',
                type: 'text',
                inputId: 'signUpFirstName',
                value: signUpForm.firstName,
            },
            {
                inputName: 'lastName',
                placeholder: 'Efternamn',
                type: 'text',
                inputId: 'signUpLastName',
                value: signUpForm.lastName,
            },
            {
                inputName: 'socialSecurityNumber',
                placeholder: 'Personnummer',
                type: 'text',
                inputId: 'signUpSocialSecurityNumber',
                value: signUpForm.socialSecurityNumber,
            },
            {
                inputName: 'email',
                placeholder: 'Mailadress',
                type: 'email',
                inputId: 'signUpMail',
                value: signUpForm.email,
            },
            {
                inputName: 'address',
                placeholder: 'Adress',
                type: 'text',
                inputId: 'signUpAddress',
                value: signUpForm.address,
            },
            {
                inputName: 'zipcode',
                placeholder: 'Postnr',
                type: 'text',
                inputId: 'signUpZipcode',
                value: signUpForm.zipcode,
            },
            {
                inputName: 'city',
                placeholder: 'Stad',
                type: 'text',
                inputId: 'signUpCity',
                value: signUpForm.city,
            },
            {
                inputName: 'phone',
                placeholder: 'Telefonnummer',
                type: 'tel',
                inputId: 'signUpPhone',
                value: signUpForm.phone,
            },
            {
                inputName: 'password',
                placeholder: 'Lösenord',
                type: 'password',
                inputId: 'signUpPassword',
                value: signUpForm.password,
            },
            {
                inputName: 'verifyPassword',
                placeholder: 'Verifiera lösenord',
                type: 'password',
                inputId: 'signUpVerifyPassword',
                value: signUpForm.verifyPassword,
            },
        ],
    };

    return (
        <>
            {isShowingForm && (
                <article
                    className={`authentication-forms__container authentication-forms__container--${
                        IsStartingToShow ? 'active' : 'inactive'
                    }`}>
                    {isShowingLoadingSection && <Loading isLoading={isLoading} />}

                    <section className={`authentication-form__wrapper`}>
                        <figure className='form-buttons__back-button '>
                            <TextButton onClick={onPressingBackButton}>X</TextButton>
                        </figure>
                        <h1 className='form-title'>{isSigningIn ? 'LOGGA IN' : 'JOIN THE MESS!'}</h1>

                        <p className={`error-message error-message--${IsShowingError ? 'active' : 'inactive'}`}>
                            Det blev något fel, var god försök igen!
                        </p>
                        <form className={`main-form main-form--active`} onSubmit={FormDefaultPreventer}>
                            {isSigningIn
                                ? formInputs.signIn.map((form) => (
                                      <SignFormInput
                                          key={form.inputId}
                                          inputName={form.inputName}
                                          placeholder={form.placeholder}
                                          type={form.type}
                                          inputId={form.inputId}
                                          value={form.value}
                                          onChangeFunc={onFormChanged}
                                          dataFormType={'signIn'}
                                      />
                                  ))
                                : formInputs.register.map((form) => (
                                      <SignFormInput
                                          key={form.inputId}
                                          inputName={form.inputName}
                                          placeholder={form.placeholder}
                                          type={form.type}
                                          inputId={form.inputId}
                                          value={form.value}
                                          onChangeFunc={onFormChanged}
                                          dataFormType={'signUp'}
                                      />
                                  ))}

                            <section className='form-buttons__wrapper'>
                                <TextButton onClick={isSigningIn ? onSignInSubmit : onSignUpSubmit}>
                                    {isSigningIn ? 'LOGGA IN' : 'REGISTRERA'}
                                </TextButton>
                                <TextButton onClick={onToggleForms}>
                                    {isSigningIn ? 'SKAPA KONTO' : 'HAR REDAN KONTO'}
                                </TextButton>
                            </section>
                        </form>
                    </section>
                </article>
            )}
        </>
    );
};

export default SignForm;

/*
 * Ändrat: Kim
 *
 * Lagt till formInputs och gjort så att inputs mappas igenom istället för en egen + skapat komponenten SignFormInput
 */
