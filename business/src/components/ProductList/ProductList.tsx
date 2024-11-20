import { ProductType } from '../../interfaces/interfaceProduct';
import ProductCard from '../ProductCard/ProductCard';
import './productList.css';

interface Props {
    title: 'Ice cream' | 'Milkshake';
    products: ProductType[];
}

const ProductList = ({ title, products }: Props) => {
    return (
        <section className='product-list'>
            <h3 className='product-list__title'>{title}</h3>
            <ul className='product-list__wrapper'>
                {products.map((product) =>
                    product.sizes.map((size) => (
                        <ProductCard key={product._id + size.size} product={product} size={size} />
                    ))
                )}
            </ul>
        </section>
    );
};

export default ProductList;

/**
 * Författare: Kim
 * Komponent för att lista de olika produkttyperna
 */
