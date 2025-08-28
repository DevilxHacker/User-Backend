import { findUserByEmail,  deleteUser, findAllUsers, findUserByUsername } from "../repositries/UserRepo.js";

export async function findUserName(req, res) {
    try {
        const response = await findUserByUsername(req.params.username);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User found successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function findUserEmail(req, res){
    try{
    const response = await findUserByEmail(req.params.email);
           return res.status(200).json({
               success: true,
               message: "User found successfully",
               data: response
           });

    }catch(error){
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


export async function DeleteUser(req, res) {
    try {
        const response = await deleteUser(req.params.id);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: response
        });

    } catch (error) {
        console.error(error);
        
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


export async function FindAllUsers(req, res) {
    try {
        const users = await findAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
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