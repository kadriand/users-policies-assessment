export class ServiceError extends Error {
    constructor(error) {
        super(error.msg);
        this.code = error.code || 500;
    }
}