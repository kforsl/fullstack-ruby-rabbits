import { MenuItemType } from '../../interfaces';
import './popularProductItem.css';

interface Props {
    product: MenuItemType;
}

const PopularProductItem = ({ product }: Props) => {
    return (
        <li className='popularProductItem'>
            <img className='popularProductItem__image' src={product.imageUrl} alt={`${product.name} image`} />
            <p> {product.name} </p>
        </li>
    );
};

export default PopularProductItem;
