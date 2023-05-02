import mongoose, { ObjectId, Schema } from "mongoose"
interface LocationInterface {
    name: string
    eirCode: string
    city: string
    openHours: Date
    capacity: number
    stringDate: string
}


const LocationsSchema =  new Schema<LocationInterface>({
    name: {
        type: String,
        required: true
    },
    eirCode: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    stringDate: {
        type: String,
        required: true
    },
    openHours: {
        type: Date,
        required: true
    },

})



const Locations = mongoose.model('Locations', LocationsSchema);
export default Locations;