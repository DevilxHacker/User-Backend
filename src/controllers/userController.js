import { signinUserService, signupUserService } from "../services/userService.js";



export async function signup(req, res) {
    try {
        const user = await signupUserService(req.body);
        console.log(user);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export async function signin(req, res) {
    try {
        const response = await signinUserService(req.body);
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: response
        });
    } catch(error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export async function update(req, res) {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        // Assuming you have a service function to handle the update logic
        const updatedUser = await updateUserService(userId, updatedData);
        
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.log(error);
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}