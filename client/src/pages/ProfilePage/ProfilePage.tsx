import ProfileNav from '../../components/ProfileNav/ProfileNav';
import './profilePage.css';

const ProfilePage: React.FC = () => {
    const changeNavOption = (navOption: 'personal' | 'payment' | 'password' | 'allergies') => {
        console.log(navOption);
    };

    return (
        <>
            <main className='profile-page'>
                <div className='wrapper'>
                    <ProfileNav onClick={changeNavOption} />
                </div>
            </main>
        </>
    );
};

export default ProfilePage;

/**
 * Författare: Kim
 * Lagt till UnderConstruction komponent.
 */
