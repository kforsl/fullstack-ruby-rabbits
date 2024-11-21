import { ProductType } from '../../interfaces/interfaceProduct';
import './popularProductItem.css';

interface Props {
    product: ProductType;
}

const PopularProductItem = ({ product }: Props) => {
    return (
        <li className='popular-product-item'>
            <img className='popular-product-item__image' src={product.imageUrl} alt={`${product.name} image`} />
            <p> {product.name} </p>
        </li>
    );
};

export default PopularProductItem;

/*
 * Författare: Kim
 * Komponent som tar emot en produkt och trycker ut ett produktkort med bild och produktnamn.
 */
