import './aboutUsPage.css';

const AboutUsPage: React.FC = () => {
    return (
        <>
            <main className='about-page wrapper'>
                <h1 className='about-page__title'>OM OSS:</h1>
                <section className='about-page__info-wrapper'>
                    <p className='about-page__paragraph'>
                        Happymess är en charmig glassbar i retrostil, där varje besök känns som en nostalgisk resa
                        tillbaka till 1950-talet. Inredningen är inspirerad av klassiska amerikanska diners, med
                        mintgröna och rosa färgskalor som skapar en lekfull atmosfär. Den randiga tapeten och de kromade
                        detaljerna, tillsammans med röda lädersäten och neonskyltar, för tankarna direkt till en tid när
                        milkshakes, sockervadd och rock'n'roll var på modet.
                    </p>
                    <p className='about-page__paragraph'>
                        På Happymess står glass i fokus, och här hittar du både klassiska och innovativa smaker som
                        ständigt förnyas. Välj bland traditionella favoriter som vanilj och choklad eller testa på mer
                        unika smaker som ”Saltad Karamell-Popcorn” och ”Karamelliserad Ananas”. Utbudet är gjort för att
                        locka både de som älskar traditionell glass och de som vill experimentera med nya
                        smakupplevelser. Glassen tillverkas på plats med lokala råvaror, vilket garanterar både hög
                        kvalitet och färska smaker.
                    </p>
                    <p className='about-page__paragraph'>
                        Förutom glass serverar Happymess också en rad nostalgiska desserter och drycker. Klassiska
                        milkshakes toppade med vispgrädde och körsbär, root beer floats och färgsprakande banana splits
                        är några av de favoriter som snabbt blivit populära bland gästerna. Varje rätt och dryck
                        serveras i retroinspirerade glas eller porslin, vilket förstärker upplevelsen.
                    </p>
                    <p className='about-page__paragraph'>
                        Happymess är en plats där både barnfamiljer och nostalgiska vuxna trivs. De färgglada väggarna
                        och vintage-musiken skapar en glad atmosfär som gör det lätt att dröja sig kvar. Baren är också
                        ett populärt val för fester och event där det söta temat skapar en lekfull stämning. Happymess
                        är mer än en glassbar; det är en plats där god smak och glada minnen möts, och där varje besök
                        ger en känsla av tidlös lycka.
                    </p>
                </section>
                <section className='employees'>
                    <figure className='employees__employee-card employees__employee-card--large'>
                        <div className='employees__image-wrapper'>
                            <img
                                src='../../../public/images/employees/mr-mustachio-no-bg.png'
                                alt=''
                                className='employees__image'
                            />
                        </div>
                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Mr. Mysterio Mustachio</h2>
                            <h3 className='employees__description'>Äger allt. Även dig.</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper'>
                            <img src='../../../public/images/employees/harry.png' alt='' className='employees__image' />
                        </div>
                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Ärlige Harry</h2>
                            <h3 className='employees__description'>Säljer allt. Även dig.</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper'>
                            <img
                                src='../../../public/images/employees/brotein.png'
                                alt=''
                                className='employees__image'
                            />
                        </div>

                        <figcaption className='employees__caption'>
                            <h2 className='employees__employee-name'>Brotein Icecream</h2>
                            <h3 className='employees__description'>Bänkar 200l glass</h3>
                        </figcaption>
                    </figure>
                    <figure className='employees__employee-card'>
                        <div className='employees__image-wrapper'>
                            <img src='../../../public/images/employees/test.png' alt='' className='employees__image' />
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
