import { useEffect, useState } from 'react';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import ProfileOrderList from '../../components/ProfileOrderList/ProfileOrderList';
import './profilePage.css';
import ProfilePersonalForm from '../../components/ProfilePersonalForm/ProfilePersonalForm';
import useAuthStore from '../../stores/authStore';
import ProfilePaymentOptionsForm from '../../components/ProfilePaymentOptionsForm/ProfilePaymentOptionsForm';
import ProfilePasswordForm from '../../components/ProfilePasswordForm/ProfilePasswordForm';
import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';
import agent from '../../services/api/agent';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { customer, setCustomer } = useAuthStore();
    const [formToShow, setFormToShow] = useState<'personal' | 'payment' | 'password' | 'allergies' | 'signout'>(
        'personal'
    );
    const changeNavOption = (navOption: 'personal' | 'payment' | 'password' | 'allergies' | 'signout') => {
        setFormToShow(navOption);
    };
    const signOut = async () => {
        const response = await agent.Authenticate.signOut();

        console.log(response);
        if (response) {
            setCustomer(null);
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('ato');
            navigate('/');
        }
    };
    useEffect(() => {
        if (formToShow === 'signout') {
            signOut();
        }
    }, [formToShow]);
    return (
        <>
            <main className='profile-page'>
                <div className='wrapper'>
                    <ProfileNav onClick={changeNavOption} active={formToShow} />
                    {formToShow === 'personal' && <ProfilePersonalForm />}
                    {formToShow === 'payment' && <ProfilePaymentOptionsForm />}
                    {formToShow === 'password' && <ProfilePasswordForm />}
                    {formToShow === 'allergies' && (
                        <section className='profile-page__under-construction'>
                            <UnderConstruction />
                        </section>
                    )}
                    {customer && <ProfileOrderList id={customer?._id as string} />}
                </div>
            </main>
        </>
    );
};

export default ProfilePage;

/*
 * Författare: Kim
 * Lagt till UnderConstruction komponent.
 *
 * Ändrat: Kim
 * Lagt till ProfileNav,ProfilePersonalForm och ProfilePasswordForm
 */
