"use server";
import fs from 'fs';
import util from 'util';

const readdir = util.promisify(fs.readdir)
const lstat = util.promisify(fs.lstat)


async function GetAvailableSolutions(): Promise<string[]>{
	const files = await readdir('./src/solutions')
    // console.log(files);
    const AllFiles: string[] = [];

    files.forEach(async (file) => {
        const stats = await lstat("src/solutions/" + file);
        if(stats.isFile()){
            // console.log("File");
            AllFiles.push(file);
        }else{
            // console.log("Not a file");
        }
    })

    return AllFiles;

}


export default GetAvailableSolutions;
