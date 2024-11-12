import './productListItem.css';
import ProductSizeQuantityItem from '../ProductSizeQuantityItem/ProductSizeQuantityItem';
import { MenuItemType } from '../../interfaces';

interface Props {
    productItem: MenuItemType;
}

const ProductListItem = ({ productItem }: Props) => {
    return (
        <li className='ProductListItem'>
            <section>
                <h2 className='ProductListItem__title'> {productItem.name}</h2>
                <section className='ProductListItem__ingredients-wrapper'>
                    {productItem.sizes[0].ingredients.map((product) => (
                        <p key={product.ingredientItem._id}>{product.ingredientItem.name},</p>
                    ))}
                </section>
            </section>
            <section className='ProductListItem__price-wrapper'>
                {productItem.sizes.map((item) => (
                    <ProductSizeQuantityItem price={item.price} key={item.price} />
                ))}
            </section>
        </li>
    );
};

export default ProductListItem;
