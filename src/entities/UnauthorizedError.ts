export class UnauthorizedError extends Error {
    public HTTP_STATUS_CODE = 401;

    constructor(message: string) {
        super(message);
    }
}