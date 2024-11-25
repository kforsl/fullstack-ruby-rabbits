export interface ProductType {
    _id: string;
    name: string;
    description: string;
    type: 'milkshake' | 'icecream';
    imageUrl: string;
    ingredients: IngredientType[];
    isSpecial: boolean;
    sizes: SizeType[];
}

interface SizeType {
    _id: string;
    size: 'small' | 'medium' | 'large';
    price: number;
    ingredientMultiplier: number;
}

interface IngredientType {
    _id: string;
    ingredient: IngredientItemType | string;
    quantityInGrams: number;
}

interface IngredientItemType {
    _id: string;
    name: string;
    description: string;
    allergens: AllergensType[];
}

interface AllergensType {
    _id: string;
    type: string;
    description: string;
}
/*
 * Författare: Kim
 * Skapat interface för ProductType, SizeType, IngredientType, IngredientItemType, AllergensType
 */
