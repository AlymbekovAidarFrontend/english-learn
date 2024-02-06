export function getRandomItems<T>(array: T[], n: number): T[] {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, n);
}