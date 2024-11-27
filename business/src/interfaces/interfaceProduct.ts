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

export interface SizeType {
    size: 'small' | 'medium' | 'large';
    price: number;
    ingredientMultiplier: number;
}

interface IngredientType {
    ingredient: IngredientItemType;
    quantity: number;
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
