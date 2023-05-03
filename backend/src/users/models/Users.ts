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
    // getUserDetails: (id: any) => Promise<any | undefined>
}
export enum userTypes {
    "Admin" = "Admin",
    "Customer" = "Customer",
    "Employee" = "Employee"
}

interface AdminMethods extends Model<AdminSchemaInterface> {
    getUserDetails: (id: any) => Promise<any | undefined>
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
Adminchema.statics.getUserDetails = async function(id:any){
    try {
        const details = await this.findById(id)
        return details;
    } catch (error) {
        return null
    }
}
const User = mongoose.model<AdminSchemaInterface, AdminMethods>("User", Adminchema);
export default User;