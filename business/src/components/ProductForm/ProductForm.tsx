import useAdminStore from '../../stores/adminStore';
import './productForm.css';
import { useGetIngredient } from '../../services/queries';
import { useEffect, useState } from 'react';
import {
    IngredientItemType,
    IngredientType,
    UpdateIngredientType,
    UpdateProductType,
} from '../../interfaces/interfaceProduct';
import { useUpdateProduct } from '../../services/mutations/useUpdateProduct';
import { useCreateProduct } from '../../services/mutations/useCreateProduct';
import { handleImageUpload } from '../../services/api/imageUpload';

const ProductForm = () => {
    const { productToEdit, isEditingProduct, setIsEditingProduct } = useAdminStore();

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
    const [formImage, setFormImage] = useState<File | null>();
    const [newIngredient, setNewIngredient] = useState<string>('');
    const [quantityIngredient, setQuantityIngredient] = useState<number>(0);
    const [addedIngredients, setAddedIngredients] = useState<IngredientType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const clearFormInputs = () => {
        setIsEditingProduct(false);
        setFormProductName('');
        setFormProductDescription('');
        setFormProductType('');
        setFormProductPriceS(0);
        setFormProductPriceM(0);
        setFormProductPriceL(0);
        setIsProductSpecial(false);
        setFormImage(null);
        setNewIngredient('');
        setQuantityIngredient(0);
        setAddedIngredients([]);
    };

    const validateForm = () => {
        if (formProductName.length < 1) {
            setErrorMessage('Ange ett produktnamn');
            return false;
        }
        if (formProductDescription.length < 1) {
            setErrorMessage('Ange en produkt beskrivning');
            return false;
        }
        if (formProductPriceS < 1 && formProductPriceM < 1 && formProductPriceL < 1) {
            setErrorMessage('Ange pris för small, medium och large');
            return false;
        }
        if (addedIngredients.length < 1) {
            setErrorMessage('Lägg till minst en ingrediens');
            return false;
        }
        return true;
    };

    const validateIngredientForm = () => {
        if (newIngredient.length < 1) {
            setErrorMessage('Välj en ingrediens att lägga till');
            return false;
        }
        if (quantityIngredient < 1) {
            setErrorMessage('Ange hur många gram av ingrediensen');
            return false;
        }
        return true;
    };

    const { data, isLoading, isError, error } = useGetIngredient();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{`${error}`}</p>;

    const submitProductInformation = async () => {
        if (validateForm()) {
            setErrorMessage('');
            const ingredientsToAdd: UpdateIngredientType[] = [];

            addedIngredients.forEach((ingredient) => {
                ingredientsToAdd.push({
                    ingredient: ingredient.ingredient._id,
                    quantityInGrams: ingredient.quantityInGrams,
                });
            });

            let imageUrl = isEditingProduct
                ? productToEdit.imageUrl
                : 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png';

            if (formImage) {
                imageUrl = await handleImageUpload(formImage);
            }

            const productInformation: UpdateProductType = {
                name: formProductName,
                description: formProductDescription,
                type: formProductType as 'icecream' | 'milkshake',
                imageUrl,
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
                updateProduct({ id: productToEdit._id, product: productInformation });
            } else {
                createProduct(productInformation);
            }
            clearFormInputs();
        }
    };

    const submitIngredientForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateIngredientForm()) {
            const foundIngredient = data?.find((ingredient) => ingredient.name === newIngredient) as IngredientItemType;
            setAddedIngredients([
                ...addedIngredients,
                {
                    ingredient: foundIngredient,
                    quantityInGrams: quantityIngredient,
                },
            ]);
            setQuantityIngredient(0);
        }
    };

    const removeIngredient = (ingredient: string) => {
        const filteredIngredientList = addedIngredients.filter((ing) => ing.ingredient._id !== ingredient);
        setAddedIngredients(filteredIngredientList);
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

                    <input
                        className='product-form__file-input'
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={(e) => e.target.files && setFormImage(e.target.files[0])}
                    />
                </form>
                <form className='product-form__form' onSubmit={submitIngredientForm}>
                    <h3 className='product-form__sub-title'>Ingredienser</h3>
                    <section className='product-form__ingredient-container'>
                        <label className='product-form__label'>
                            Ingrediens
                            <select
                                className='product-form__input'
                                required
                                onChange={(e) => {
                                    setNewIngredient(e.target.value);
                                }}>
                                <option value='null'> </option>
                                {data?.map(
                                    (ingredient) =>
                                        !addedIngredients.find((ing) => ing.ingredient.name === ingredient.name) && (
                                            <option key={ingredient._id} value={ingredient.name}>
                                                {ingredient.name}
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
                                value={quantityIngredient}
                                required
                                onChange={(e) => {
                                    setQuantityIngredient(parseInt(e.target.value));
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
                                <p onClick={() => removeIngredient(ingredient.ingredient._id)}>X</p>
                            </li>
                        ))}
                    </ul>
                </form>
            </section>
            <p className='produkt-form__error-msg'> {errorMessage} </p>
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
 *
 * Ändrat: Kim
 * Funktion som lägger till en bild i en s3 bucket och returnerar en url till bilden.
 */
