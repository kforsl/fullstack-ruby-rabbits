import './textButton.css';
interface TextButton {
    children: string;
    onClick?: () => void;
}
const TextButton: React.FC<TextButton> = ({ children, onClick }) => {
    return (
        <button className='text-button' onClick={onClick}>
            {children}
        </button>
    );
};

export default TextButton;

/*
 *Författare: Magnus
 *Komponent för textknapp. Används som vanlig knapp där children är texten som skrivs mellan taggarna. onClick funktionen som skickas ned.
 *Ändrat: Magnus
 * Ändrade färg till rosa och satte drop-shadow.
 */
