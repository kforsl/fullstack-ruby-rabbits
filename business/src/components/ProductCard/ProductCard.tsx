import { ProductType, SizeType } from '../../interfaces/interfaceProduct';
import useCartStore from '../../stores/cartStore';
import './productCard.css';

interface Props {
    product: ProductType;
    size: SizeType;
}

const ProductCard = ({ product, size }: Props) => {
    const { cart, addToCart, deleteFromCart } = useCartStore();

    const productCartFunction = () => {
        const foundProduct = cart.find((item) => item.id === product._id && item.size === size.size);
        if (!foundProduct) {
            addToCart({
                id: product._id,
                name: product.name,
                price: size.price,
                quantity: 1,
                size: size.size,
            });
        } else {
            deleteFromCart(foundProduct);
        }
    };

    return (
        <article className='product-card' onClick={() => productCartFunction()}>
            <img
                className='product-card__image'
                src='/assets/strawberry-milkshake.png'
                alt={`Produktbild för ${product.name}`}
            />
            <h3 className='product-card__text'>{product.name}</h3>
            <h4 className='product-card__text'>{size.size}</h4>
            <h4 className='product-card__text'> {size.price} Kr </h4>
        </article>
    );
};

export default ProductCard;
