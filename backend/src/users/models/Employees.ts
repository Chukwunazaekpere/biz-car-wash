import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
import { AdminSchemaInterface } from "./Users";
dotenv.config({path: "./backend/src/config/.env"})


interface EmployeesSchemaInterface extends AdminSchemaInterface {
    availabiity: string
}


interface EmployeesMethods extends Model<EmployeesSchemaInterface> {
    getEmployeesId: (id: string) => Promise<string | undefined>
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

const Employees = mongoose.model<EmployeesSchemaInterface, EmployeesMethods>("Employees", Employeeschema);
export default Employees;