import './textButton.css';
interface TextButton {
    children: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    modifier?: string;
}
const TextButton: React.FC<TextButton> = ({ children, onClick, disabled, modifier }) => {
    return (
        <button
            className={`text-button ${disabled ? 'text-button--disabled' : ''} ${
                modifier ? `text-button--${modifier}` : ''
            }`}
            disabled={disabled}
            onClick={onClick}>
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
 * Lade till disabled funktionalitet med css. Kan skicka ned en modifier klass. Har nu stop propagation på onClick för att förhindra att flera funktioner utlöses.
 */
