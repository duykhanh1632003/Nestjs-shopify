export interface ResponseData<T> {
    status: boolean,
    message: string,
    data?: T,
    statusCode: number
}

export const successResponse = <T>(message: string, data?: T, statusCode = 200): ResponseData<T> => {
    return {
        status: true,
        message,
        data,
        statusCode
    }
}

export const errorResponse = (message: string, statusCode = 500): ResponseData<null> => {
    return {
        status: false,
        message,
        statusCode
    }
}