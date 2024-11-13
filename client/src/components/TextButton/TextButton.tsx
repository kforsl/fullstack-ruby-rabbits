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
