import { useState } from 'react';
import TextButton from '../TextButton/TextButton';
import './profilePasswordForm.css';
import { useUpdateProfile } from '../../services/mutations/useUpdateProfile';

const ProfilePasswordForm = () => {
    const [isErrorShowing, setIsErrorShowing] = useState<boolean>(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');

    const submitUpdatePasswordForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        interface passwordForm {
            password: string;
            newPassword: string;
            verifyPassword: string;
        }

        const formData: passwordForm = {
            password,
            newPassword,
            verifyPassword,
        };
        updateProfile(
            {
                route: 'password',
                formData,
            },
            {
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
            }
        );
    };

    return (
        <form onSubmit={submitUpdatePasswordForm} className='password-form'>
            <h2 className='password-form__title'>Byta lösenord</h2>
            {isErrorShowing && <p className='password-form__error'> Något gick fel....</p>}
            <label className='password-form__label'>
                Gamalt Lösenord
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
