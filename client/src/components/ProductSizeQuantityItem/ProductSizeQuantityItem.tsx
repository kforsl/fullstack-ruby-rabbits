import { AnimatePresence, motion } from 'framer-motion';
import { CartItem } from '../../interfaces/interfaceCart';
import { ProductType, SizeType } from '../../interfaces/interfaceProduct';
import useCartStore from '../../stores/cartStore';
import useWindowSizeStore from '../../stores/windowSizeStore';
import MenuToCartIncrementer from '../MenuToCartIncrementer/MenuToCartIncrementer';
import TextButton from '../TextButton/TextButton';
import './productSizeQuantityItem.css';

interface Props {
    product: ProductType;
    size: SizeType;
    showSize?: boolean;
}

const ProductSizeQuantityItem = ({ product, size, showSize }: Props) => {
    const { addToCart, cart } = useCartStore();
    const { width } = useWindowSizeStore();
    const foundProduct = cart.find((cartItem) => cartItem.id === product._id && cartItem.size === size.size);

    const cartItem: CartItem = {
        id: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: size.price,
        quantity: 1,
        size: size.size,
    };
    return (
        <section className='product-size-quantity-item'>
            <p className='product-size-quantity-item__price'> {size.price} kr </p>
            <AnimatePresence mode='wait' initial={false}>
                {foundProduct ? (
                    <motion.div
                        key='incrementer'
                        initial={{ rotateX: 180 }}
                        animate={{ rotateX: 0 }}
                        exit={{ rotateX: 180 }}
                        transition={{ duration: 0.1 }}>
                        <MenuToCartIncrementer item={foundProduct} />
                    </motion.div>
                ) : (
                    <motion.div
                        key='button'
                        initial={{ rotateX: 180 }}
                        animate={{ rotateX: 0 }}
                        exit={{ rotateX: 180 }}
                        transition={{ duration: 0.1 }}>
                        <TextButton onClick={() => addToCart(cartItem)}>
                            {showSize || width <= 700 ? `KÖP ${size.size.charAt(0)}` : 'KÖP'}
                        </TextButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProductSizeQuantityItem;

/*
 * Författare: Kim
 * Komponent som tar emot ett pris och trycker ut priset på skärmen.
 *
 * Ädrat: Magnus
 * Lade till funktionalitet genom textbutton och MenuToCartIncrementer för att lägga till/ta bort från cart. Ändrade cartItem id och hur foundproduct fungerar.
 *
 * Ändrat: Magnus
 * Nu renderas texten ut beroende på skärmstorlek. Små storlekar står storleken direkt i knappen.
 *
 * Ändrat: Magnus
 * Lagt till animering via framer.
 */
