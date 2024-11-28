import './textButton.css';
interface TextButton {
    children: string;
    onClick?: () => void;
    disabled?: boolean;
}
const TextButton: React.FC<TextButton> = ({ children, onClick, disabled }) => {
    return (
        <button
            className={`text-button ${disabled ? 'text-button--disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default TextButton;

/*
 * Författare: Magnus
 * Komponent för textknapp. Används som vanlig knapp där children är texten som skrivs mellan taggarna. onClick funktionen som skickas ned.
 *
 * Ändrat: Magnus
 * Ändrade färg till rosa och satte drop-shadow.
 *
 * Ändrat: Magnus
 * Lade till disabled funktionalitet med css.
 */
