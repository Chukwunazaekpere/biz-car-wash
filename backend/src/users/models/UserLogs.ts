import mongoose, {Model} from "mongoose";

interface UserLogInterface {
    userFullname: string
    stringDate: string
    userType: string
    operation: string
    dateCreated: Date
    monthRecord: number
    yearRecord: number
}

interface UsersLogMethods extends Model<UserLogInterface> {
    getUsersLogId: (id: string) => Promise<string | undefined>
};

const UserLogSchema = new mongoose.Schema<UserLogInterface>({
    userFullname: {
        type: String,
        index: true,
    },
    stringDate: {
        type: String,
        required: true,
        // unique: true
    },
    monthRecord: {
        type: Number,
        required: true,
        // unique: true
    },
    yearRecord: {
        type: Number,
        required: true,
    },
    userType: {
        type: String,
        required: false,
    },
    operation: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
});



UserLogSchema.statics.getUsersLogId = async function(id: string): Promise<string | undefined> { 
    try {
        const usersLogId = await this.findById(id);
        return usersLogId.logId;
    } catch (error) {
        return undefined
    }
}


const UserLog = mongoose.model<UserLogInterface, UsersLogMethods>("UserLog", UserLogSchema);
export default UserLog;