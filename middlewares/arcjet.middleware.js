import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()){
            if (decision.reason.isRateLimit()){
                return res.status(429).json({
                    error: "Rate limit exceeded",
                    message: "You have exceeded the allowed number of requests. Please try again later."
                });
            }
            if (decision.reason.isBot()){
                return res.status(403).json({
                    error: "Bot detected",
                    message: "Your request has been blocked as it appears to be from a bot."
                });
            }
            return res.status(403).json({
                error: "Access denied",
                message: "Your request has been denied due to security rules."
            });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Arcjet Middleware Error:", error);
        next(error);
    }
}

export default arcjetMiddleware;