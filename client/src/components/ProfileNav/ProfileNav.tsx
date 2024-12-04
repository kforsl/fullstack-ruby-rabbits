import './profileNav.css';

interface Props {
    onClick: (navOption: 'personal' | 'payment' | 'password' | 'allergies') => void;
    active: 'personal' | 'payment' | 'password' | 'allergies';
}

const ProfileNav = ({ onClick, active }: Props) => {
    return (
        <nav className='profile-nav'>
            <ul className='profile-nav__list'>
                <li
                    onClick={() => onClick('personal')}
                    className={`profile-nav__list-item ${active === 'personal' && 'profile-nav__list-item--active'}`}>
                    Personuppgifter
                </li>
                <li
                    onClick={() => onClick('payment')}
                    className={`profile-nav__list-item ${active === 'payment' && 'profile-nav__list-item--active'}`}>
                    Betalalternativ
                </li>
                <li
                    onClick={() => onClick('password')}
                    className={`profile-nav__list-item ${active === 'password' && 'profile-nav__list-item--active'}`}>
                    Byta Lösenord
                </li>
                <li
                    onClick={() => onClick('allergies')}
                    className={`profile-nav__list-item ${active === 'allergies' && 'profile-nav__list-item--active'}`}>
                    Allergier
                </li>
            </ul>
        </nav>
    );
};

export default ProfileNav;

/*
 * Författare: Kim
 *
 * Skapat komponent för att ändra vilket formulär som ska visas för användaren.
 */
