import {CustomError} from "./custom-error"
export class NotFoundError extends CustomError {


    statusCode=404;
    reason="Route does not exists";
    constructor()
    {
        super("Route does not exists");
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }

    serializeErrors(){
        return [{message:this.reason}]
    }
};