export const validateRequest = (schema) => async (req, res, next) => {
    try {
        if (schema.params) req.params = await schema.params.parseAsync(req.params);
        if (schema.body) req.body = await schema.body.parseAsync(req.body);
        if (schema.query) req.query = await schema.query.parseAsync(req.query);
        next();
    } catch (error) {
        let errorMessage = error.message;
        try {
            const parsedError = JSON.parse(error.message);
            if (Array.isArray(parsedError) && parsedError[0]?.message) {
                errorMessage = parsedError[0].message;
            }
        } catch (e) {
            // fallback to original message if not valid JSON
        }
        
        console.error('Error validating request:', errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
};