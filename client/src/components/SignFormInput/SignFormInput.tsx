import { FormInputs } from '../../interfaces/interfaceAuth';
import './signFormInput.css';

const SignFormInput = ({ inputName, placeholder, type, inputId, value, onChangeFunc, dataFormType }: FormInputs) => {
    return (
        <input
            className='input-field input-field__text'
            placeholder={placeholder}
            type={type}
            name={inputName}
            id={inputId}
            value={value}
            onChange={onChangeFunc}
            data-form-type={dataFormType}
            aria-label={inputName}
        />
    );
};

export default SignFormInput;
