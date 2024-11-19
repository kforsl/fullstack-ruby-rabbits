//@description: Returnerar de n sista bokstäverna av en sträng.
export function getLastNCharacters(str: string, n: number): string {
    let newString = str.slice(-n);
    return newString;
}

// @description: Konverterar ett datumobjekt till tid i sträng.
export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleString('sv-SE', {
        // year: 'numeric',
        // month: 'long',
        // day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });
}
/*
 *Författare: Magnus
 * Lade in getLastNCharacters och formatDate funktionerna.
 *
 */
