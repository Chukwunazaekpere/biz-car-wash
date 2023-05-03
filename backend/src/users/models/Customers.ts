import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
import { AdminSchemaInterface } from "./Users";
dotenv.config({path: "./backend/src/config/.env"})


interface CustomersSchemaInterface extends AdminSchemaInterface {
    address: string
    city: string
    vehicle: string
}


interface CustomersMethods extends Model<CustomersSchemaInterface> {
    getCustomersId: (id: string) => Promise<string | undefined>
    // getUserDetails: (id: string) => Promise<any | undefined>
};

const Customerschema = new Schema<CustomersSchemaInterface>({
    vehicle: {
        type: String,
        required: false,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
});

Customerschema.statics.getCustomersId = async function(id: string): Promise<string | undefined> { 
    try {
        const CustomersId = await this.findById(id);
        return CustomersId.email;
    } catch (error) {
        return undefined
    }
};

// Customerschema.statics.getUserDetails = async function(id:any){
//     try {
//         const details = await this.findById(id)
//         return details;
//     } catch (error) {
//         return null
//     }
// }

const Customers = mongoose.model<CustomersSchemaInterface, CustomersMethods>("Customers", Customerschema);
export default Customers;