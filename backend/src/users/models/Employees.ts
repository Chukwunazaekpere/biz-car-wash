import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
import { AdminSchemaInterface } from "./Users";
dotenv.config({path: "./backend/src/config/.env"})


interface EmployeesSchemaInterface extends AdminSchemaInterface {
    availabiity: string
}


interface EmployeesMethods extends Model<EmployeesSchemaInterface> {
    getEmployeesId: (id: string) => Promise<string | undefined>
    // getUserDetails: (id: string) => Promise<any | undefined>

};

const Employeeschema = new mongoose.Schema<EmployeesSchemaInterface>({
    availabiity: {
        type: String,
        required: true,
    },
});

Employeeschema.statics.getEmployeesId = async function(id: string): Promise<string | undefined> { 
    try {
        const EmployeesId = await this.findById(id);
        return EmployeesId.email;
    } catch (error) {
        return undefined
    }
}

// Employeeschema.statics.getUserDetails = async function(id:any){
//     try {
//         const details = await this.findById(id)
//         return details;
//     } catch (error) {
//         return null
//     }
// }
const Employees = mongoose.model<EmployeesSchemaInterface, EmployeesMethods>("Employees", Employeeschema);
export default Employees;