import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
import { AdminSchemaInterface } from "./Users";
dotenv.config({path: "./backend/src/config/.env"})


interface CustoomersSchemaInterface extends AdminSchemaInterface {
    address: string
    city: string
    vehicle: string
}


interface CustoomersMethods extends Model<CustoomersSchemaInterface> {
    getCustoomersId: (id: string) => Promise<string | undefined>
};

const Custoomerschema = new Schema<CustoomersSchemaInterface>({
    vehicle: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
});

Custoomerschema.statics.getCustoomersId = async function(id: string): Promise<string | undefined> { 
    try {
        const CustoomersId = await this.findById(id);
        return CustoomersId.email;
    } catch (error) {
        return undefined
    }
}

const Custoomers = mongoose.model<CustoomersSchemaInterface, CustoomersMethods>("Custoomers", Custoomerschema);
export default Custoomers;