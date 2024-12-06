import { ChangeEvent } from 'react';
import './CommentForm.css';
interface Props {
    comment: string;
    onSave: () => void;
    setComment: (comment: string) => void;
    onAbort: () => void;
}
const CommentForm: React.FC<Props> = ({ onSave, setComment, onAbort, comment }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    return (
        <form className='comment-form'>
            <button className='comment-form__button comment-form__button--red' onClick={onAbort}>
                X
            </button>
            <button className='comment-form__button comment-form__button--green' onClick={onSave}>
                &#10003;
            </button>
            <textarea
                placeholder='Skriv din kommentar här...'
                className='comment-form__input'
                name='orderComment'
                id='orderComment'
                onChange={(e) => handleChange(e)}
                value={comment ? comment : ''}></textarea>
        </form>
    );
};

export default CommentForm;

/*
 * Författare: Magnus
 * Skapade komponent som sparar kommentar vid beställning.
 */
