//@description: Returnerar de n sista bokstäverna av en sträng.
export function getLastNCharacters(str: string, n: number): string {
    let newString = str.slice(-n);
    return newString;
}

/*
 * Författare: Magnus
 * Lade in getLastNCharacters.
 */
