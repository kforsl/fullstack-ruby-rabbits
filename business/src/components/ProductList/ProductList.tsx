import { ProductType } from '../../interfaces/interfaceProduct';
import ProductCard from '../ProductCard/ProductCard';
import './productList.css';
import { useLocation } from 'react-router-dom';
import EditProductCard from '../EditProductCard/EditProductCard';

interface Props {
    title: 'Ice cream' | 'Milkshake';
    products: ProductType[];
}

const ProductList = ({ title, products }: Props) => {
    const location = useLocation();

    return (
        <section className='product-list'>
            <h3 className='product-list__title'>{title}</h3>
            <ul className='product-list__wrapper'>
                {location.pathname === '/kassa'
                    ? products.map((product) =>
                          product.sizes.map((size) => (
                              <ProductCard key={product._id + size.size} product={product} size={size} />
                          ))
                      )
                    : products.map((product) => <EditProductCard key={product._id} product={product} />)}
            </ul>
        </section>
    );
};

export default ProductList;

/**
 * Författare: Kim
 * Komponent för att lista de olika produkttyperna
 */
