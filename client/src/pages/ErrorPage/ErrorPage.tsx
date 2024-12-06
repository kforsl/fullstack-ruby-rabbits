import './errorPage.css';

const ErrorPage: React.FC = () => {
    return (
        <main className='error-page wrapper'>
            <h1 className='error-page__title'>Oops!</h1>
            <div className='error-page__description-wrapper'>
                <p className='error-page__description error-page__description--top'>Något har gått fel! </p>
                <p className='error-page__description'>Vi ber om ursäkt för det!</p>
            </div>
        </main>
    );
};

export default ErrorPage;

/*
 * Författare: Magnus
 * Skapat sida för error. Navigeras hit istället för att krascha om inte menyn kan hämtas eller om orderbekräftelsen går fel.
 */
