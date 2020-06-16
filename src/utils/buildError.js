import * as HttpStatus from 'http-status-codes';

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
    // HTTP errors
    if (err.isBoom) {
        if (err.output.statusCode === HttpStatus.BAD_REQUEST)
            return {
                code: err.output.statusCode,
                details: err.data
            };
        else
            return {
                code: err.output.statusCode,
                message:  err.output.payload.message || err.output.payload.error
            };
    }

    // Return INTERNAL_SERVER_ERROR for all other cases
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
}

export default buildError;
