import useAdminStore from '../../stores/adminStore';
import './productForm.css';
import { useGetIngrediant } from '../../services/queries';
import { useEffect, useState } from 'react';
import {
    IngredientItemType,
    IngredientType,
    UpdateIngredientType,
    UpdateProductType,
} from '../../interfaces/interfaceProduct';
import { useUpdateProduct } from '../../services/mutations/useUpdateProduct';
import { useCreateProduct } from '../../services/mutations/useCreateProduct';

const ProductForm = () => {
    const { productToEdit, isEditingProduct } = useAdminStore();

    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: createProduct } = useCreateProduct();

    useEffect(() => {
        setFormProductName(productToEdit.name);
        setFormProductDescription(productToEdit.description);
        setFormProductType(productToEdit.type);
        setFormProductPriceS(productToEdit.sizes[0].price);
        setFormProductPriceM(productToEdit.sizes[1].price);
        setFormProductPriceL(productToEdit.sizes[2].price);
        setIsProductSpecial(productToEdit.isSpecial);
        setAddedIngredients(productToEdit.ingredients);
    }, [productToEdit]);

    const [formProductName, setFormProductName] = useState<string>('');
    const [formProductDescription, setFormProductDescription] = useState<string>('');
    const [formProductType, setFormProductType] = useState<string>('icecream');
    const [formProductPriceS, setFormProductPriceS] = useState<number>(0);
    const [formProductPriceM, setFormProductPriceM] = useState<number>(0);
    const [formProductPriceL, setFormProductPriceL] = useState<number>(0);
    const [isProductSpecial, setIsProductSpecial] = useState<boolean>(false);
    const [newIngrediant, setnewIngrediant] = useState<string>('');
    const [quantityIngrediant, setQuantityIngrediant] = useState<number>(0);
    const [addedIngredients, setAddedIngredients] = useState<IngredientType[]>([]);

    const { data, isLoading, isError, error } = useGetIngrediant();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const submitProductInformation = () => {
        const ingredientsToAdd: UpdateIngredientType[] = [];

        addedIngredients.forEach((ingredient) => {
            ingredientsToAdd.push({
                ingredient: ingredient.ingredient._id,
                quantityInGrams: ingredient.quantityInGrams,
            });
        });

        const productInformation: UpdateProductType = {
            name: formProductName,
            description: formProductDescription,
            type: formProductType as 'icecream' | 'milkshake',
            imageUrl: productToEdit
                ? productToEdit.imageUrl
                : 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png',
            ingredients: ingredientsToAdd,
            isSpecial: isProductSpecial,
            sizes: [
                {
                    size: 'small',
                    price: formProductPriceS,
                },
                {
                    size: 'medium',
                    price: formProductPriceM,
                },
                {
                    size: 'large',
                    price: formProductPriceL,
                },
            ],
        };
        if (productToEdit._id.length > 0) {
            console.log('update');
            updateProduct({ id: productToEdit._id, product: productInformation });
        } else {
            console.log('create');
            createProduct(productInformation);
        }
    };

    const submitIngredientForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newIngrediant);
        const foundIngrediant = data?.find((ingredient) => ingredient.name === newIngrediant) as IngredientItemType;
        setAddedIngredients([
            ...addedIngredients,
            {
                ingredient: foundIngrediant,
                quantityInGrams: quantityIngrediant,
            },
        ]);
        setQuantityIngrediant(0);
    };

    const removeIngrediant = (ingredient: string) => {
        const filterdIngrediantList = addedIngredients.filter((ing) => ing.ingredient._id !== ingredient);
        setAddedIngredients(filterdIngrediantList);
    };

    return (
        <section className='product-form'>
            <h2 className='product-form__title'> {isEditingProduct ? 'Ändra Produkt' : 'Lägg till ny Produkt'}</h2>
            <section className='product-form__form-section'>
                <form className='product-form__form'>
                    <label className='product-form__label'>
                        Produktnamn:
                        <input
                            className='product-form__input'
                            type='text'
                            placeholder='Produktnamn...'
                            value={formProductName}
                            onChange={(e) => {
                                setFormProductName(e.target.value);
                            }}
                        />
                    </label>
                    <label className='product-form__label'>
                        Beskrivning:
                        <textarea
                            className='product-form__desc'
                            placeholder='Beskrivning.....'
                            value={formProductDescription}
                            onChange={(e) => {
                                setFormProductDescription(e.target.value);
                            }}></textarea>
                    </label>
                    <label className='product-form__label'>
                        <select
                            className='product-form__input'
                            onChange={(e) => setFormProductType(e.target.value)}
                            value={formProductType}>
                            <option value='icecream'> Ice Cream</option>
                            <option value='milkshake'> Milkshake</option>
                        </select>
                    </label>
                    <section className='product-form__size-container'>
                        <label className='product-form__label'>
                            Pris Small
                            <input
                                className='product-form__input'
                                type='number'
                                value={formProductPriceS}
                                onChange={(e) => {
                                    setFormProductPriceS(parseInt(e.target.value));
                                }}
                            />
                        </label>
                        <label className='product-form__label'>
                            Pris Medium
                            <input
                                className='product-form__input'
                                type='number'
                                value={formProductPriceM}
                                onChange={(e) => {
                                    setFormProductPriceM(parseInt(e.target.value));
                                }}
                            />
                        </label>
                        <label className='product-form__label'>
                            Pris Large
                            <input
                                className='product-form__input'
                                type='number'
                                value={formProductPriceL}
                                onChange={(e) => {
                                    setFormProductPriceL(parseInt(e.target.value));
                                }}
                            />
                        </label>
                    </section>
                    <label>
                        <input
                            className='product-form__checkbox'
                            type='checkbox'
                            checked={isProductSpecial}
                            onChange={() => {
                                setIsProductSpecial(!isProductSpecial);
                            }}
                        />
                        Sätt som Populär
                    </label>

                    <input className='product-form__file-input' type='file' accept='image/png, image/jpeg' />
                </form>
                <form className='product-form__form' onSubmit={submitIngredientForm}>
                    <h3 className='product-form__sub-title'>Ingredienser</h3>
                    <section className='product-form__ingredient-container'>
                        <label className='product-form__label'>
                            Ingrediens
                            <select
                                className='product-form__input'
                                onChange={(e) => {
                                    setnewIngrediant(e.target.value);
                                }}>
                                <option value='null'> </option>
                                {data?.map(
                                    (ingrediant) =>
                                        !addedIngredients.find((ing) => ing.ingredient.name === ingrediant.name) && (
                                            <option key={ingrediant._id} value={ingrediant.name}>
                                                {ingrediant.name}
                                            </option>
                                        )
                                )}
                            </select>
                        </label>
                        <label className='product-form__label'>
                            Gram
                            <input
                                className='product-form__input'
                                type='number'
                                value={quantityIngrediant}
                                onChange={(e) => {
                                    setQuantityIngrediant(parseInt(e.target.value));
                                }}
                            />
                        </label>
                    </section>
                    <button className='product-form__btn'> Lägg till ny ingredient </button>
                    <ul className='product-form__ingredient-list'>
                        {addedIngredients.map((ingredient) => (
                            <li key={ingredient.ingredient._id} className='product-form__ingredient'>
                                <p>
                                    {ingredient.ingredient.name} - {ingredient.quantityInGrams}g
                                </p>
                                <p onClick={() => removeIngrediant(ingredient.ingredient._id)}>X</p>
                            </li>
                        ))}
                    </ul>
                </form>
            </section>
            <button onClick={submitProductInformation} className='product-form__btn'>
                {isEditingProduct ? 'Ändra Produkten' : 'Lägg till Produkten'}
            </button>
        </section>
    );
};

export default ProductForm;

/*
 * Författare: Kim
 * Formulär som sparar input från användare när en produkt ska ändras eller skapas. Behöver brytas ner och skapa fler komponenter.
 */
