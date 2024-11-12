import './productListItem.css';
import ProductSizeQuantityItem from '../ProductSizeQuantityItem/ProductSizeQuantityItem';
import { MenuItemType } from '../../interfaces';

interface Props {
    menuItem: MenuItemType;
}

const ProductListItem = ({ menuItem }: Props) => {
    return (
        <article>
            {menuItem.sizes.map((item) => (
                <ProductSizeQuantityItem price={item.price} />
            ))}
        </article>
    );
};

export default ProductListItem;
