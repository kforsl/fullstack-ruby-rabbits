import { useState } from 'react';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import ProfileOrderList from '../../components/ProfileOrderList/ProfileOrderList';
import './profilePage.css';
import ProfilePersonalForm from '../../components/ProfilePersonalForm/ProfilePersonalForm';
import useAuthStore from '../../stores/authStore';
import ProfilePaymentOptionsForm from '../../components/ProfilePaymentOptionsForm/ProfilePaymentOptionsForm';
import ProfilePasswordForm from '../../components/ProfilePasswordForm/ProfilePasswordForm';
const ProfilePage: React.FC = () => {
    const { customer } = useAuthStore();
    const [formToShow, setFormToShow] = useState<string>('personal');
    const changeNavOption = (navOption: 'personal' | 'payment' | 'password' | 'allergies') => {
        setFormToShow(navOption);
    };

    return (
        <>
            <main className='profile-page'>
                <div className='wrapper'>
                    <ProfileNav onClick={changeNavOption} />
                    {formToShow === 'personal' && <ProfilePersonalForm />}
                    {formToShow === 'payment' && <ProfilePaymentOptionsForm />}
                    {formToShow === 'password' && <ProfilePasswordForm />}
                    {formToShow === 'allergies' && <h1> allergies </h1>}

                    {customer && <ProfileOrderList id={customer?._id as string} />}
                </div>
            </main>
        </>
    );
};

export default ProfilePage;

/**
 * Författare: Kim
 * Lagt till UnderConstruction komponent.
 *
 * Ändrat: Kim
 * Lagt till ProfileNav,ProfilePersonalForm och ProfilePasswordForm
 */
