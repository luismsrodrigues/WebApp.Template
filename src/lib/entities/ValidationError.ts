interface ErrorFieldData {
    field: string,
    message: string
}

export class ValidationError extends Error {
    public HTTP_STATUS_CODE = 409;
    public Values: ErrorFieldData[] = [];

    constructor(message: string) {
        super(message);
    }

    public AddValue(data: ErrorFieldData): this {
        this.Values.push(data);

        return this;
    }
}