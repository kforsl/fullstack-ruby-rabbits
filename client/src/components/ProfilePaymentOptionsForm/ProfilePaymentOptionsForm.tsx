import { useEffect, useState } from 'react';
import './profilePaymentOptionsForm.css';
import useAuthStore from '../../stores/authStore';
import { PaymentOption } from '../../interfaces/interfaceAuth';
import TextButton from '../TextButton/TextButton';
import { useUpdatePaymentOptions } from '../../services/mutations/useUpdatePaymentOptions';
import { useNavigate } from 'react-router-dom';

const ProfilePaymentOptionsForm = () => {
    const { mutate: updatePaymentOptions } = useUpdatePaymentOptions();
    const { customer } = useAuthStore();
    const [swishPaymentOption, setSwishPaymentOption] = useState<PaymentOption>();
    const [cardPaymentOption, setCardPaymentOption] = useState<PaymentOption>();
    const [checkboxes, setCheckboxes] = useState<{ swish: boolean; card: boolean }>({ swish: false, card: false });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (customer === null) navigate('/');
        else {
            if (customer.paymentOptions !== null) {
                setSwishPaymentOption(customer.paymentOptions?.find((x) => x.paymentOption === 'Swish'));
                setCardPaymentOption(customer.paymentOptions?.find((x) => x.paymentOption === 'Card'));
            }
        }
    }, []);
    useEffect(() => {
        if (customer !== null) {
            if (customer.paymentOptions !== null) {
                setCheckboxes(() => {
                    return {
                        swish: swishPaymentOption ? true : false,
                        card: cardPaymentOption ? true : false,
                    };
                });
            }
        }
    }, [swishPaymentOption, cardPaymentOption]);

    const handleChangeInput = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        if (name === 'Swish') {
            setSwishPaymentOption(() => {
                return { paymentOption: name, paymentDetails: value };
            });
        } else {
            setCardPaymentOption(() => {
                return { paymentOption: name, paymentDetails: value };
            });
        }
    };
    const handleCheckbox = (e: React.FormEvent) => {
        const { name, checked } = e.target as HTMLInputElement;
        setCheckboxes((prevValue) => {
            return { ...prevValue, [name]: checked };
        });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditing) {
            const paymentOptions: PaymentOption[] = [];

            if (checkboxes.swish && swishPaymentOption !== undefined) paymentOptions.push(swishPaymentOption);
            if (checkboxes.card && cardPaymentOption !== undefined) paymentOptions.push(cardPaymentOption);
            if (paymentOptions !== undefined) {
                updatePaymentOptions({ paymentOptions });
                if (customer !== null) {
                    customer.paymentOptions = paymentOptions;
                    sessionStorage.setItem('user', JSON.stringify(customer));
                }
            }
        }
    };
    return (
        <>
            <form className='payment-form' onSubmit={handleSubmit}>
                {/* <h2 className='payment-form__title'> Betalningsalternativ: </h2> */}

                <section className='payment-form__input-section'>
                    <label className='payment-form__label'>Swish</label>
                    <input
                        name='swish'
                        className='payment-form__checkbox'
                        type='checkbox'
                        checked={checkboxes.swish}
                        onChange={handleCheckbox}
                        disabled={!isEditing}
                    />
                    {checkboxes.swish && (
                        <section className='payment-form__extra-info'>
                            <label className='payment-form__label'>
                                Telefonnummer:
                                <input
                                    name='Swish'
                                    className='payment-form__text-input'
                                    type='text'
                                    placeholder='0701234567'
                                    value={swishPaymentOption?.paymentDetails}
                                    onChange={handleChangeInput}
                                    disabled={!isEditing}
                                />
                            </label>
                        </section>
                    )}
                </section>
                <section className='payment-form__input-section'>
                    <label className='payment-form__label'>Betalkort</label>
                    <input
                        name='card'
                        className='payment-form__checkbox'
                        type='checkbox'
                        checked={checkboxes.card}
                        onChange={handleCheckbox}
                        disabled={!isEditing}
                    />
                    {checkboxes.card && (
                        <section className='payment-form__extra-info'>
                            <label className='payment-form__label'>
                                Kortnummer:
                                <input
                                    name='Card'
                                    className='payment-form__text-input'
                                    type='text'
                                    placeholder='1234567890123456'
                                    value={cardPaymentOption?.paymentDetails}
                                    onChange={handleChangeInput}
                                    disabled={!isEditing}
                                />
                            </label>
                        </section>
                    )}
                </section>
                {isEditing ? (
                    <TextButton onClick={() => setIsEditing(false)}> SPARA ÄNDRING </TextButton>
                ) : (
                    <TextButton onClick={() => setIsEditing(true)}> ÄNDRA </TextButton>
                )}
            </form>
        </>
    );
};

export default ProfilePaymentOptionsForm;
