import { IHandler } from "../interfaces/Interfaces";

export class ImageHandler implements IHandler {

    public async getMediaURI(data: Response): Promise<string> {
        return await data.url;
    }
    
    public getContent() {
        return null;
    }

}