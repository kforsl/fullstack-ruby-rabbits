import { useState } from 'react';
import TextButton from '../TextButton/TextButton';
import './profilePasswordForm.css';
import { PasswordForm } from '../../interfaces/interfaceAuth';
import { useUpdatePassword } from './../../services/mutations/useUpdatePassword';

const ProfilePasswordForm = () => {
    const [isErrorShowing, setIsErrorShowing] = useState<boolean>(false);
    const { mutate: updatePassword, isPending } = useUpdatePassword();

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');

    const submitUpdatePasswordForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordDetails: PasswordForm = {
            password,
            newPassword,
            verifyPassword,
        };

        console.log(passwordDetails);
        updatePassword(passwordDetails, {
            onSuccess: () => {
                console.log('success');
                setPassword('');
                setNewPassword('');
                setVerifyPassword('');
            },
            onError: (error) => {
                console.error('Order creation failed:', error);
                setIsErrorShowing(true);
            },
        });
    };

    return (
        <form onSubmit={submitUpdatePasswordForm} className='password-form'>
            <h2 className='password-form__title'>Byta lösenord</h2>
            {isErrorShowing && <p className='password-form__error'> Något gick fel....</p>}
            <label className='password-form__label'>
                Gammalt Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label className='password-form__label'>
                Nytt Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label className='password-form__label'>
                Upprepa Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
            </label>
            <TextButton children={isPending ? 'Loading...' : 'Ändra'} />
        </form>
    );
};

export default ProfilePasswordForm;
