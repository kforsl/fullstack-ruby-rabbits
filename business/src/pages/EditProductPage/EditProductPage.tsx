import { useState } from 'react';
import './editProductPage.css';
import { useGetMenu } from '../../services/queries';
import { ProductType } from '../../interfaces/interfaceProduct';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';

const EditProductPage = () => {
    const { data, isLoading, isError, error } = useGetMenu();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const iceCream = data?.filter((item) => item.type === 'icecream') as ProductType[];

    const milkshake = data?.filter((item) => item.type === 'milkshake') as ProductType[];

    return (
        <main>
            <div className='wrapper'>
                <section className='edit-product'>
                    <article className='edit-product__wrapper'>
                        <h1 className='edit-product__title'> Produkter </h1>

                        <section className='edit-product__products-section'>
                            <ProductList title='Ice cream' products={iceCream} />
                            <ProductList title='Milkshake' products={milkshake} />
                        </section>
                    </article>
                    <article className='checkoutMenu__edit-section'>
                        <ProductForm />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default EditProductPage;
