import { checkIfUserExists } from "../services/userService.js";
import { verifyJWT } from "../utilities/JWT.js";


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"] ;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Authentication token is required",
            });
        }

        let decoded;
        try {
            decoded = verifyJWT(token);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        const user = await checkIfUserExists(decoded.email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource",
            });
        }
        next();
    } catch (error) {
        console.error("isAdmin Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
