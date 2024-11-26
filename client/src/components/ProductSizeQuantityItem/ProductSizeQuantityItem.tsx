import { CartItem } from '../../interfaces/interfaceCart';
import { ProductType, SizeType } from '../../interfaces/interfaceProduct';
import useCartStore from '../../stores/cartStore';
import MenuToCartIncrementer from '../MenuToCartIncrementer/MenuToCartIncrementer';
import TextButton from '../TextButton/TextButton';
import './productSizeQuantityItem.css';

interface Props {
    product: ProductType;
    size: SizeType;
}

const ProductSizeQuantityItem = ({ product, size }: Props) => {
    const { addToCart, cart } = useCartStore();
    const foundProduct = cart.find((cartItem) => cartItem.id === size._id);

    const cartItem: CartItem = {
        id: size._id, //product._id?
        imageUrl: product.imageUrl,
        name: product.name,
        price: size.price,
        quantity: 1,
        size: size.size,
    };
    return (
        <section className='product-size-quantity-item'>
            <p className='product-size-quantity-item__price'> {size.price} kr </p>
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
 * Lade till funktionalitet genom textbutton och MenuToCartIncrementer för att lägga till/ta bort från cart
 */
