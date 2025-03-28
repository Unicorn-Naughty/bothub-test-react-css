export const clearChunks = (chunk: string) => {
    const clean = chunk.split("data: ").join(""); // Use split and join as an alternative
    const subChanks = clean.split("\n").filter(Boolean);
    try {
        return subChanks.map((subchunk: string) => JSON.parse(subchunk));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return [];
    }
}