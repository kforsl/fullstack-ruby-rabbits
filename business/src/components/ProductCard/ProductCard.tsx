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
                imageUrl: product.imageUrl
                    ? product.imageUrl
                    : 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png',
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
            <figure
                className={
                    cart.find((item) => item.id === product._id && item.size === size.size)
                        ? 'product-card__image-container active'
                        : 'product-card__image-container'
                }>
                <img
                    className='product-card__image'
                    src={
                        product.imageUrl
                            ? product.imageUrl
                            : 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png'
                    }
                    alt={`Produktbild för ${product.name}`}
                />
            </figure>
            <h3 className='product-card__text'>
                {product.name} - {size.size.slice(0, 1).toUpperCase()}
            </h3>
            <h4 className='product-card__text'> {size.price} Kr </h4>
        </article>
    );
};

export default ProductCard;
