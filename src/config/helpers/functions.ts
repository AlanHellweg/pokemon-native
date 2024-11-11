
export const isColorLight = (color: string): boolean => {
    if (color.startsWith('#')) {
        color = color.slice(1);
    }

    if (color.length === 3) {
        color = color.split('').map(char => char + char).join('');
    }

    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186;
}

export class Formatter {
    static capitalize(str: string, allWords: boolean = false) {
        if (allWords) {
            return str.replace(/\b\w/g, (l) => l.toUpperCase());
        } else {
            return str.replace(/\b\w/, (l) => l.toUpperCase());
        }
    }
}
