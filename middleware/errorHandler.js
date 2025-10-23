// This middleware handles all the errors in the app 
// Throws a json response with detailed error
import constants from "../constants";
const errorHandle = (err, req, res, next) => {
    // checks for the status code adn defaults to 500 if none is set
    const statusCode = res.statusCode ? res.statusCode : constants.INTERNAL_SERVER_ERROR;
    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({
                title: "validation failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
           res.json({
                title : "Not found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title :"Server Error",
                message: err.message,
                stackTrace:err.stack
            });
            break;
    }
}

export default errorHandle;