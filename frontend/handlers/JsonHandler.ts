import { IHandler } from "../interfaces/Interfaces";

export class JsonHandler implements IHandler {
    
    public async getMediaURI(data: Response): Promise<string> {
        const dataJ = await data.json();
        if (dataJ["image"]) {
            return dataJ["image"];
        }
        throw new Error("No image attribute in metadata.");
    }

    public getContent() {
        return null;
    }
}