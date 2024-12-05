import './underConstruction.css';
import underConstruction from '/images/under-construction.png';

const UnderConstruction = () => {
    return (
        <figure className='under-construction'>
            <img className='under-construction__image' src={underConstruction} alt='Arbetare som jobbar på sidan' />
        </figure>
    );
};

export default UnderConstruction;

/**
 * Författare Kim
 * Skapat en komponent som kan användas när vi har sidor som inte är färdiga.
 */
