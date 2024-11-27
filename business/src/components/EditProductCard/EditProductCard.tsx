import { ProductType } from '../../interfaces/interfaceProduct';
import './editProductCard.css';

interface Props {
    product: ProductType;
}

const EditProductCard = ({ product }: Props) => {
    return (
        <article className='edit-product-card' onClick={() => console.log('click')}>
            <section className='edit-product-card-section'>
                <figure
                    className={
                        // ? 'product-card__image-container active'
                        'edit-product-card__image-container'
                    }>
                    <img
                        className='edit-product-card__image'
                        src={
                            product.imageUrl
                                ? product.imageUrl
                                : 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png'
                        }
                        alt={`Produktbild för ${product.name}`}
                    />
                </figure>
                <div className=''>
                    <h3 className='edit-product-card__title'>{product.name}</h3>
                    <p className='edit-product-card__desc'> {product.description}</p>
                </div>
            </section>
            <section className='edit-product-card-section'>
                <ul className='edit-product-card__list'>
                    {product.ingredients.map((ingredient) => (
                        <li key={ingredient.ingredient._id}> {ingredient.ingredient.name}, </li>
                    ))}
                </ul>

                <ul className='edit-product-card__list'>
                    {product.sizes.map((size) => (
                        <li key={size.size} className='edit-product-card__list-item'>
                            <p className='edit-product-card__size'>
                                {size.size.slice(0, 1).toUpperCase()} - {size.price} kr
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default EditProductCard;
