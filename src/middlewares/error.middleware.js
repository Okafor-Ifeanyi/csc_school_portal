const errorHandler = (error, req, res, next) => {
    const errorStatus = error.status || 501
    const errorMessage = error.message || "Somethign went wrong"
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage
    })
}

export{ errorHandler }