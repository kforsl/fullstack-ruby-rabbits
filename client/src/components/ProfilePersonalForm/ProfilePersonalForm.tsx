import TextButton from '../TextButton/TextButton';
import './profilePersonalForm.css';

const ProfilePersonalForm = () => {
    return (
        <form className='personal-form'>
            <h2 className='personal-form__title'> PersonUppgifter: </h2>
            <label className='personal-form__label'>
                Namn:
                <input className='personal-form__text-input' type='text' placeholder='John Doe' />
            </label>
            <label className='personal-form__label'>
                Personnr:
                <input className='personal-form__text-input' type='text' placeholder='9002291234' />
            </label>
            <label className='personal-form__label'>
                E-post:
                <input className='personal-form__text-input' type='text' placeholder='john.doe@mail.com' />
            </label>
            <label className='personal-form__label'>
                Telefonnummer:
                <input className='personal-form__text-input' type='text' placeholder='0731243123' />
            </label>
            <section className='personal-form__adress-section'>
                <label className='personal-form__adress-label'>
                    Address:
                    <input className='personal-form__text-input' type='text' placeholder='Storgatan 22' />
                </label>
                <label className='personal-form__city-label'>
                    Stad:
                    <input className='personal-form__text-input' type='text' placeholder='Stockholm' />
                </label>
                <label className='personal-form__zip-label'>
                    Postnummer:
                    <input className='personal-form__text-input' type='text' placeholder='114 56' />
                </label>
            </section>
            <TextButton children='Ändra' />
        </form>
    );
};

export default ProfilePersonalForm;
