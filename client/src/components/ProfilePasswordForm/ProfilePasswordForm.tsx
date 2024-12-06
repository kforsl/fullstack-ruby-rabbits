import { useState } from 'react';
import TextButton from '../TextButton/TextButton';
import './profilePasswordForm.css';
import { PasswordForm } from '../../interfaces/interfaceAuth';
import { useUpdatePassword } from './../../services/mutations/useUpdatePassword';

const ProfilePasswordForm = () => {
    const [isErrorShowing, setIsErrorShowing] = useState<boolean>(false);
    const { mutate: updatePassword } = useUpdatePassword();

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const submitUpdatePasswordForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEditing) {
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
                    console.error('Password change failed:', error);
                    setIsErrorShowing(true);
                },
            });
        }
    };

    return (
        <form onSubmit={submitUpdatePasswordForm} className='password-form'>
            {isErrorShowing && <p className='password-form__error'> Något gick fel....</p>}
            <label className='password-form__label'>
                Gammalt Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                />
            </label>
            <label className='password-form__label'>
                Nytt Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!isEditing}
                />
            </label>
            <label className='password-form__label'>
                Upprepa Lösenord
                <input
                    className='password-form__input'
                    type='password'
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    disabled={!isEditing}
                />
            </label>
            {isEditing ? (
                <TextButton onClick={() => setIsEditing(false)}> SPARA ÄNDRING </TextButton>
            ) : (
                <TextButton onClick={() => setIsEditing(true)}> ÄNDRA </TextButton>
            )}
        </form>
    );
};

export default ProfilePasswordForm;
