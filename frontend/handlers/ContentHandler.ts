import { IHandler } from "../interfaces/Interfaces";
import { ImageHandler } from "./ImageHandler";
import { JsonHandler } from "./JsonHandler";
import { TextHandler } from "./TextHandler";
import { logger } from "../logger";

export class ContentHandler {
    private handlers: Map<string, IHandler>;

    constructor() {
        this.handlers = new Map<string, IHandler>();
        this.handlers.set("image/jpeg", new ImageHandler());
        this.handlers.set("image/png", new ImageHandler());
        this.handlers.set("image/gif", new ImageHandler());
        this.handlers.set("application/json", new JsonHandler());
        this.handlers.set("application/json; charset=utf-8", new JsonHandler());
        this.handlers.set("text/plain; charset=utf-8", new TextHandler());
    }

    public getHandler(contentType: string): IHandler {
        const ct = contentType.toLowerCase();
        if (this.handlers.has(ct)) {
            return this.handlers.get(ct);
        }
        logger.trackEvent({"name": "contentHandler",
            "properties": {
                "contentType": contentType
            }
        });
        throw new Error("There is no handler for the request type: " + contentType);
    }

}