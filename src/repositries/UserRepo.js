import User from '../schema/User.js';

export const findAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.log(error);
    }
}

export const findUserByName = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (id, userData) => {
    try {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};


export const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
}

export const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        console.log(error);
    }
}
