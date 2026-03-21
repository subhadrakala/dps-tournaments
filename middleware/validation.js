export const validateRequest = (schema) => async (req, res, next) => {
    try {
        if (schema.params) req.params = await schema.params.parseAsync(req.params);
        if (schema.body) req.body = await schema.body.parseAsync(req.body);
        if (schema.query) req.query = await schema.query.parseAsync(req.query);
        next();
    } catch (error) {
        console.error('Error validating request:', JSON.parse(error.message));
        return res.status(400).json({ error: JSON.parse(error.message) });
    }
};