import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v); // now returns boolean
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true, 
        minLength: 8
    },

    role: {
        type: String,
        enum: ["user", "admin"], // allowed values
        default: "user" // default role
    }
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;
