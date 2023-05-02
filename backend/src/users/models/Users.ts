import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: "./backend/src/config/.env"})


export interface AdminSchemaInterface {
    name: string
    email: string
    lastSeen: Date
    dateCreated: Date,
    dateUpdated: Date
    stringDate: string
    phone: string
    userType: string
    username: string
    password: string
}
export enum userTypes {
    "Admin",
    "Customer",
    "Employee"
}

interface AdminMethods extends Model<AdminSchemaInterface> {
    // getAdminId: (id: string) => Promise<string | undefined>
};

const Adminchema = new Schema<AdminSchemaInterface>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        enum: userTypes
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    stringDate: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    lastSeen: {
        type: Date,
        required: false,
    },
    dateUpdated: {
        type: Date,
        required: true
    }
});

const User = mongoose.model<AdminSchemaInterface, AdminMethods>("User", Adminchema);
export default User;