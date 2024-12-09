import './aboutUsPage.css';

const AboutUsPage: React.FC = () => {
    return (
        <>
            <main className='about-page wrapper'>
                <h1 className='about-page__title'>HÄR JOBBAR VI!</h1>
                <section className='about-page__info-wrapper'>
                    <p className='about-page__paragraph'>
                        Happymess är takeaway-glassbaren som tar "sött kaos" till nya höjder, styrt av Mr Mustachio. Här
                        jobbar tre unika karaktärer: Ärlige Harry, ställets toppsäljare med kreativa metoder, Brotein
                        Icecream, fitnessfantasten som flexar muskler och proteinfakta, och King Dingeling,
                        glassteknikern som skapar allt från fruktdrömmar till chokladbomber.
                    </p>
                    <p className='about-page__paragraph'>
                        Hos Happymess handlar allt om att ta med sig smakerna. Mango Tango, en tropisk mix av mango och
                        passionsfrukt, och Bubblegum Bliss, en bubblig mix av bubbelgum och marshmallows, är
                        glassfavoriterna. Milkshakes som Coconut Carnival och Oreo Overload gör också succé.
                    </p>
                    <p className='about-page__paragraph'>
                        Stämningen är en balans mellan skratt och glassiga katastrofer. "Varje klantig servering är en
                        del av showen!" säger Mr Mustachio medan Ärlige Harry säljer en "unik" milkshake. Brotein
                        Icecream pushar för "gains-vänliga" val, och King Dingelings glasspyramider balanserar alltid på
                        gränsen till kollaps.
                    </p>
                    <p className='about-page__paragraph'>
                        Happymess är mer än en takeaway-glassbar – det är en plats där smaker och skratt möts i en
                        perfekt storm. Oavsett om du är här för Mango Tango eller Coconut Carnival, blir varje besök ett
                        smakrikt minne. Lämna plats i hjärtat för Happymess-magi!
                    </p>
                </section>
                <section className='employees'>
                    <figure className='employees__employee-card employees__employee-card--large'>
                        <div className='employees__image-wrapper employees__image-wrapper--first'>
                            <img src='/images/employees/mr-mustachio-no-bg.png' alt='' className='employees__image' />
                        </div>
                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Mr. Mustachio</h2>
                            <h3 className='employees__description'>Äger allt. Även dig.</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper employees__image-wrapper--second'>
                            <img src='/images/employees/harry.png' alt='' className='employees__image' />
                        </div>
                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Ärlige Harry</h2>
                            <h3 className='employees__description'>Säljer allt. Även dig.</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper employees__image-wrapper--third'>
                            <img src='/images/employees/brotein.png' alt='' className='employees__image' />
                        </div>

                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Brotein Icecream</h2>
                            <h3 className='employees__description'>Bänkar 200l glass</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper employees__image-wrapper--fourth'>
                            <img src='/images/employees/test.png' alt='' className='employees__image' />
                        </div>

                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>King Dingeling</h2>
                            <h3 className='employees__description'>Glasstekniker</h3>
                        </figcaption>
                    </figure>
                </section>
            </main>
        </>
    );
};

export default AboutUsPage;

/*
 * Författare: Johan
 * grundläggande layout för sidan med information.
 *
 * Ändrat: Magnus
 * Tog bort image och lade den i headerkomponent.
 *
 * Ändrat: Magnus
 * Gjort om grid, lagt in figures med innehåll och gjort sidan responsiv.
 */
