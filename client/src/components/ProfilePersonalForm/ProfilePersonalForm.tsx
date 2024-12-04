import { useEffect, useState } from 'react';
import TextButton from '../TextButton/TextButton';
import './profilePersonalForm.css';
import { Customer } from '../../interfaces/interfaceAuth';
import { useUpdatePersonalData } from '../../services/mutations/useUpdatePersonalData';

const ProfilePersonalForm = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [socialSecurityNumber, setSocialSecurityNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>('');

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const storageInformation: string | null = sessionStorage.getItem('user');
        const storageObject: Customer = storageInformation && JSON.parse(storageInformation);
        if (storageObject) {
            setFirstName(storageObject.firstName);
            setLastName(storageObject.lastName);
            setSocialSecurityNumber(storageObject.socialSecurityNumber);
            setEmail(storageObject.email);
            setPhone(storageObject.phone);
            setAddress(storageObject.address);
            setCity(storageObject.city);
            setZipcode(storageObject.zipcode);
        }
    }, []);

    const { mutate: updatePersonalData } = useUpdatePersonalData();

    const updateDataInDB = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditing) {
            updatePersonalData({
                firstName,
                lastName,
                socialSecurityNumber,
                email,
                phone,
                address,
                zipcode,
                city,
            });
        }
    };

    return (
        <form onSubmit={updateDataInDB} className='personal-form'>
            <section className='personal-form__name-section'>
                <label className='personal-form__label'>
                    Förnamn:
                    <input
                        className='personal-form__text-input'
                        type='text'
                        placeholder='John'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={!isEditing}
                    />
                </label>
                <label className='personal-form__label'>
                    Efternamn:
                    <input
                        className='personal-form__text-input'
                        type='text'
                        placeholder='Doe'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={!isEditing}
                    />
                </label>
            </section>
            <label className='personal-form__label'>
                Personnr:
                <input
                    className='personal-form__text-input'
                    type='text'
                    placeholder='9002291234'
                    value={socialSecurityNumber}
                    onChange={(e) => setSocialSecurityNumber(e.target.value)}
                    required
                    disabled={!isEditing}
                />
            </label>
            <label className='personal-form__label'>
                E-post:
                <input
                    className='personal-form__text-input'
                    type='text'
                    placeholder='john.doe@mail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={!isEditing}
                />
            </label>
            <label className='personal-form__label'>
                Telefonnummer:
                <input
                    className='personal-form__text-input'
                    type='text'
                    placeholder='0731243123'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={!isEditing}
                />
            </label>
            <section className='personal-form__adress-section'>
                <label className='personal-form__adress-label'>
                    Address:
                    <input
                        className='personal-form__text-input'
                        type='text'
                        placeholder='Storgatan 22'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        disabled={!isEditing}
                    />
                </label>
                <label className='personal-form__city-label'>
                    Stad:
                    <input
                        className='personal-form__text-input'
                        type='text'
                        placeholder='Stockholm'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        disabled={!isEditing}
                    />
                </label>
                <label className='personal-form__zip-label'>
                    Postnummer:
                    <input
                        className='personal-form__text-input'
                        type='text'
                        placeholder='114 56'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                        disabled={!isEditing}
                    />
                </label>
            </section>
            {isEditing ? (
                <TextButton onClick={() => setIsEditing(false)}> SPARA ÄNDRING </TextButton>
            ) : (
                <TextButton onClick={() => setIsEditing(true)}> ÄNDRA </TextButton>
            )}
        </form>
    );
};

export default ProfilePersonalForm;

/*
 * Författare: Kim
 * Skapat ett formulär så användaren kan ändra uppgifter om sig själv.
 */
