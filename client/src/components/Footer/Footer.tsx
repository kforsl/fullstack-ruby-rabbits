import './footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <section className='footer__wrapper'>
                <h2 className='footer__logo' onClick={() => window.scrollTo(0, 0)} title='Back to top!'>
                    Happymess
                </h2>
                <ul className='footer__list'>
                    <h4 className='footer__list-title'>Öppettider</h4>
                    <li className='footer__list-item'>Mån - Fre: 10:00 - 18:00</li>
                    <li className='footer__list-item'>Lör: 11:00 - 17:00</li>
                    <li className='footer__list-item'>Sön: Stängt</li>
                </ul>
                <ul className='footer__list'>
                    <h4 className='footer__list-title'>Adress</h4>
                    <li className='footer__list-item'>Storgatan 22</li>
                    <li className='footer__list-item'>114 56 Stockholm, Sverige</li>
                </ul>
                <ul className='footer__list'>
                    <h4 className='footer__list-title'>Kontakta Oss</h4>

                    <li className='footer__list-item'>Telefon: +46 8 123 45 678</li>
                    <li className='footer__list-item'>Email: info@happymess.se</li>
                </ul>

                <p className='footer__copyright'>&copy; 2024 Happymess AB. Alla rättigheter förbehållna.</p>
            </section>
        </footer>
    );
};

export default Footer;

/*
 * Författare: Kim
 * Skapat grundläggande layout av footer.
 */
/*
 * Ändrat: Kim
 * ändrat spacing i footer och ändrat text-align
 */
/*
 * Ändrat: Magnus
 * Fixade responsivitet och layout vid mindre skärmstorlekar. Lade till back-to-top funktionalitet om man klickar "happymess"
 */
