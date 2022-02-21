import { IHandler } from "../interfaces/Interfaces";

export class TextHandler implements IHandler {
    private content = null;
    
    public async getMediaURI(data: Response): Promise<string> {
        const text = await data.text();
        console.log(text);
        this.content = text;
        return await data.url;
    }

    public async getContent() {
        return this.content;
    }

}