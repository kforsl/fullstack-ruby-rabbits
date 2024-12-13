import './employeeCard.css';
import { EmployeeInfo } from '../../interfaces/interfaceEmployeeInfo';
interface Props {
    employee: EmployeeInfo;
}
const EmployeeCard: React.FC<Props> = ({ employee }) => {
    return (
        <figure
            className={`employees__employee-card ${employee.size ? `employees__employee-card--${employee.size}` : ''}`}>
            <div className={`employees__image-wrapper ${`employees__image-wrapper--${employee.order}`}`}>
                <img src={employee.src} alt={employee.alt} className='employees__image' />
            </div>
            <figcaption className='employees__caption'>
                <h2 className='employees__employee-name'>{employee.name}</h2>
                <h3 className='employees__description'>{employee.desc}</h3>
            </figcaption>
        </figure>
    );
};

export default EmployeeCard;

/*
 * Författare: Magnus
 * Komponent som renderar ut ett kort med bild och bildtext.
 */
