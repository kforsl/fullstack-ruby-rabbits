import { ProductType } from '../../interfaces/interfaceProduct';
import ProductListItem from '../ProductListItem/ProductListItem';
import './productList.css';

interface Props {
    title: string;
    position: 'left' | 'right';
    productItems: ProductType[];
}

const ProductList = ({ title, position, productItems }: Props) => {
    return (
        <section className={`product-list product-list--${position}`}>
            <h2 className='product-list__title'>{title}</h2>
            <ul className='product-list__menu-list'>
                {productItems.map((productItem) => (
                    <ProductListItem productItem={productItem} key={productItem._id} />
                ))}
            </ul>
        </section>
    );
};

export default ProductList;

/**
 * Författare: Kim
 * Komponent som tar emot title, en produktlistan, "left" eller "right" position för placering. och trycker ut en lista av alla produkter i produktlistan.
 */
