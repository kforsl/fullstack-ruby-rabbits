import './productListItem.css';
import ProductSizeQuantityItem from '../ProductSizeQuantityItem/ProductSizeQuantityItem';
import { MenuItemType } from '../../interfaces';

interface Props {
    productItem: MenuItemType;
}

const ProductListItem = ({ productItem }: Props) => {
    return (
        <li className='product-list-item'>
            <section>
                <h2 className='product-list-item__title'> {productItem.name}</h2>
                <ul className='product-list-item__ingredients-list'>
                    {productItem.sizes[0].ingredients.map((product) => (
                        <li key={product.ingredientItem._id}>{product.ingredientItem.name},</li>
                    ))}
                </ul>
            </section>
            <section className='product-list-item__price-wrapper'>
                {productItem.sizes.map((item) => (
                    <ProductSizeQuantityItem price={item.price} key={item.price} />
                ))}
            </section>
        </li>
    );
};

export default ProductListItem;

/**
 * Författare: Kim
 * Komponent som tar emot en produkt och trycker ut ett listobjekt med produktnamn, lista med ingredienser och pris.
 */
