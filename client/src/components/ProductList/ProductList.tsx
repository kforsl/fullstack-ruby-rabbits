import { ProductType } from '../../interfaces/interfaceProduct';
import useWindowSizeStore from '../../stores/windowSizeStore';
import ProductListItem from '../ProductListItem/ProductListItem';
import './productList.css';

interface Props {
    title: string;
    position: 'left' | 'right';
    productItems: ProductType[];
}

const ProductList = ({ title, position, productItems }: Props) => {
    const { width } = useWindowSizeStore();
    return (
        <section className={`product-list product-list--${position}`}>
            <h2 className='product-list__title'>{title}</h2>
            {width > 700 && (
                <div className='product-list__size-wrapper'>
                    <h3 className='product-list__size-title'>S</h3>
                    <h3 className='product-list__size-title'>M</h3>
                    <h3 className='product-list__size-title'>L</h3>
                </div>
            )}
            <ul className='product-list__menu-list'>
                {productItems.map((productItem) => (
                    <ProductListItem productItem={productItem} key={productItem._id} />
                ))}
            </ul>
        </section>
    );
};

export default ProductList;

/*
 * Författare: Kim
 * Komponent som tar emot title, en produktlistan, "left" eller "right" position för placering. och trycker ut en lista av alla produkter i produktlistan.
 */
