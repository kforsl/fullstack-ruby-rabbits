import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import { EmployeeInfo } from '../../interfaces/interfaceEmployeeInfo';
import './aboutUsPage.css';

const AboutUsPage: React.FC = () => {
    const employees: EmployeeInfo[] = [
        {
            name: 'Mr. Mustachio',
            desc: 'Äger allt. Även dig.',
            alt: 'Mustaschprydd gentleman som står vid en rullvagn och säljer glass.',
            src: '/images/employees/mr-mustachio-no-bg.png',
            order: 'first',
            size: 'large',
        },
        {
            name: 'Ärlige Harry',
            desc: 'Säljer allt. Även dig.',
            alt: 'Harry med sitt säljande leende.',
            src: '/images/employees/harry.png',
            order: 'second',
        },
        {
            name: 'Brotein Icecream',
            desc: 'Bänkar 200l glass',
            alt: 'En muskulös men orolig grabb.',
            src: '/images/employees/brotein.png',
            order: 'third',
        },
        {
            name: 'King Dingeling',
            desc: 'Glasstekniker',
            alt: 'Grabb som faller in i kategorin "13 eller 30?"',
            src: '/images/employees/test.png',
            order: 'fourth',
        },
    ];
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
                    {employees.map((employee, i) => (
                        <EmployeeCard key={i} employee={employee} />
                    ))}
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
 *
 * Ändrat: Magnus
 * Gjort figures till komponenter och gjorde array som loopas ut.
 */
