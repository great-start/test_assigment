export class ErrorHandler extends Error {
    success: boolean;

    message: string;

    status: number;

    fails?: {};

    constructor(
        message: string,
        success: boolean = false,
        status: number = 400,
        fails: object = {},
    ) {
        super(message);
        this.success = success;
        this.status = status;
        this.fails = fails;

        Error.captureStackTrace(this, this.constructor);
    }
}
