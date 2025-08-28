import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utilities/JWT.js";
import { createUser,findUserByEmail, findUserByUsername, updateUser } from '../repositries/UserRepo.js';

export const signupUserService= async(userData)=> {
    try {
        const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    const newUser = await createUser(userData);
    } catch (error) {
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw {
                status: 400,
                message: "User with the same email or username already exists"
            }
        }
        throw error;
    }
}

export const signinUserService = async (userDetails) => {
    try {

        let user=null;
        if (userDetails.email) {
            user = await findUserByEmail(userDetails.email);
        }
        if (!user && userDetails.username) {
            user = await findUserByUsername(userDetails.username);
        }

        if(!user) {
            throw {
                status: 404,
                message: "User not found"
            }
        }

        // 2. Compare the password
        const isPasswordValid =  bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid) {
            throw {
                status: 401,
                message: "Invalid password"
            }
        }

        const token = generateJwtToken({ email: user.email, _id: user._id, username: user.username, role: user.role || "user"  });

        return token;


    } catch (error) {
        throw error;
    }
}


export const updateUserService = async (userId, updatedData) => {
    try {
        // Assuming you have a function to update the user in the database
        const updatedUser = await updateUser(userId, updatedData);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}


export const checkIfUserExists = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}