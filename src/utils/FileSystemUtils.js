import fs from "fs/promises";

export const readFile = async (path, encoding = 'utf8') => {

    try {
        const data = await fs.readFile(path, encoding);
        return JSON.parse(data);
    } catch (error) {
        return error;
    }
}

export const writeFile = async (path, encoding = 'utf8') => {
    try {
        await fs.writeFile(path, encoding);
    } catch (error) {
        console.log(error);
        throw error;
    }
}