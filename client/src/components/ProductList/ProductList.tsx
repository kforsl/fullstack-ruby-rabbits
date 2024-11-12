import { MenuItemType } from '../../interfaces';
import ProductListItem from '../ProductListItem/ProductListItem';
import './productList.css';

interface Props {
    title: string;
    position: 'left' | 'right';
    productItems: MenuItemType[];
}

const ProductList = ({ title, position, productItems }: Props) => {
    return (
        <section className={`productList productList--${position}`}>
            <h2 className='productList__title'>{title}</h2>
            <ul className='productList__menu-list'>
                {productItems.map((productItem) => (
                    <ProductListItem productItem={productItem} key={productItem._id} />
                ))}
            </ul>
        </section>
    );
};

export default ProductList;
