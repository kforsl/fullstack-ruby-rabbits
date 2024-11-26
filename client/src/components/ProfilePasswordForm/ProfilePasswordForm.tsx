import { useState } from 'react';
import TextButton from '../TextButton/TextButton';
import './profilePasswordForm.css';

const ProfilePasswordForm = () => {
    const [isErrorShowing, setIsErrorShowing] = useState<boolean>(false);
    return (
        <form className='password-form'>
            <h2 className='password-form__title'>Byta lösenord</h2>
            {isErrorShowing && <p className='password-form__error'> Något gick fel....</p>}
            <label className='password-form__label'>
                Gamalt Lösenord
                <input className='password-form__input' type='password' />
            </label>
            <label className='password-form__label'>
                Nytt Lösenord
                <input className='password-form__input' type='password' />
            </label>
            <label className='password-form__label'>
                Upprepa Lösenord
                <input className='password-form__input' type='password' />
            </label>
            <TextButton children='Ändra' />
        </form>
    );
};

export default ProfilePasswordForm;
