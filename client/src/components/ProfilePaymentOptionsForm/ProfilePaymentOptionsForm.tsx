import './profilePaymentOptionsForm.css';
const ProfilePaymentOptionsForm = () => {
    return (
        <form className='payment-form'>
            <h2 className='payment-form__title'> Betalningsalternativ: </h2>
            <section className='payment-form__input-section'>
                <label className='payment-form__label'>Betala med Swish?</label>
                <input className='payment-form__checkbox' type='checkbox' />
            </section>
        </form>
    );
};

export default ProfilePaymentOptionsForm;
