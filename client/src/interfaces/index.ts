export interface ProductType {
    _id: string;
    name: string;
    description: string;
    type: string;
    imageUrl: string;
    sizes: SizeType[];
}

interface SizeType {
    size: string;
    prize: number;
    ingredients: IngredientType[];
}

interface IngredientType {
    ingredientItem: IngredientItemType;
    quantity: number;
}

interface IngredientItemType {
    _id: string;
    name: string;
    description: string;
    allergens: AllergensType[];
}

interface AllergensType {
    type: string;
    description: string;
}

/**
 * Författare: Kim
 * Skapat interface för ProductType, SizeType, IngredientType, IngredientItemType, AllergensType
 */
