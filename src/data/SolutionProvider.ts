"use server";

import fs from 'fs';
import util from 'util';

async function UserSolutionProvider( id: string ): Promise<string> {
    const readFile = util.promisify(fs.readFile);
    try {
        const data = await readFile(`./src/solutions/${id}.cpp`, 'utf8');
        // console.log("data =", data);
        return data;
    } catch (err) {
        console.error(err);
        return "Error: File not found";
    }
}

export default UserSolutionProvider;
