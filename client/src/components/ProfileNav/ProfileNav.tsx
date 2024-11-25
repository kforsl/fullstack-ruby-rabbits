import './profileNav.css';

interface Props {
    onClick: (navOption: 'personal' | 'payment' | 'password' | 'allergies') => void;
}

const ProfileNav = ({ onClick }: Props) => {
    return (
        <nav className='profile-nav'>
            <ul className='profile-nav__list'>
                <li onClick={() => onClick('personal')} className='profile-nav__list-item'>
                    Personuppgifter
                </li>
                <li onClick={() => onClick('payment')} className='profile-nav__list-item'>
                    Betalalternativ
                </li>
                <li onClick={() => onClick('password')} className='profile-nav__list-item'>
                    Byta Lösenord
                </li>
                <li onClick={() => onClick('allergies')} className='profile-nav__list-item'>
                    Allergier
                </li>
            </ul>
        </nav>
    );
};

export default ProfileNav;
