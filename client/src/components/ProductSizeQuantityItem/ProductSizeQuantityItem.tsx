import { ProductType } from '../../interfaces/interfaceProduct';
import useCartStore from '../../stores/cartStore';
import MenuToCartIncrementer from '../MenuToCartIncrementer/MenuToCartIncrementer';
import TextButton from '../TextButton/TextButton';
import './productSizeQuantityItem.css';

interface Props {
    price: number;
    size: 'small' | 'medium' | 'large';
    item: ProductType;
}

const ProductSizeQuantityItem = ({ price, size, item }: Props) => {
    const { addToCart, cart } = useCartStore();
    const foundProduct = cart.find((cartItem) => cartItem.id === item._id && cartItem.size === size);

    const cartItem = {
        id: item._id,
        name: item.name,
        price: price,
        quantity: 1,
        size: size,
    };
    return (
        <section className='product-size-quantity-item'>
            <p className='product-size-quantity-item__price'> {price} kr </p>
            {!foundProduct ? (
                <TextButton onClick={() => addToCart(cartItem)}>KÖP</TextButton>
            ) : (
                <MenuToCartIncrementer item={cartItem} />
            )}
        </section>
    );
};

export default ProductSizeQuantityItem;

/*
 * Författare: Kim
 * Komponent som tar emot ett pris och trycker ut priset på skärmen.
 *
 * Ädrat: Magnus
 * Lade till funktionalitet genom textbutton och menutocartincrementer för att lägga till/ta bort från cart
 */
