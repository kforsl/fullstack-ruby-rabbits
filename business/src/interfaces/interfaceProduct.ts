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

export interface IngredientType {
    ingredient: IngredientItemType;
    quantityInGrams: number;
}

export interface IngredientItemType {
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

export interface UpdateProductType {
    name: string;
    description: string;
    type: 'milkshake' | 'icecream';
    imageUrl: string;
    ingredients: UpdateIngredientType[];
    isSpecial: boolean;
    sizes: UpdateSizeType[];
}

export interface UpdateIngredientType {
    ingredient: string;
    quantityInGrams: number;
}

interface UpdateSizeType {
    size: 'small' | 'medium' | 'large';
    price: number;
}

/*
 * Författare: Kim
 * Skapat interface för ProductType, SizeType, IngredientType, IngredientItemType, AllergensType
 * Ändrat: Kim
 * Laggt till UpdateProductType, UpdateIngredientType och UpdateSizeType
 */
