export class LogicError extends Error {
    public HTTP_STATUS_CODE = 400;

    constructor(message: string) {
        super(message);
    }
}