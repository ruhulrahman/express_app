const getErrorDetails = (error, res) => {
    if (error.name === 'ValidationError') {
        const errorDetails = error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
        }, {});
        return res.status(400).json({ errors: errorDetails });
    }
    
    res.status(500).json({ error: error.message });
}

module.exports = { getErrorDetails};