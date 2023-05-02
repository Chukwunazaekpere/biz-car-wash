import mongoose, { ObjectId, Schema } from "mongoose"
interface ServicesInterface {
    name: string
    description: string
    city: string
    duration: string
    price: number
    stringDate: string
    locationId: ObjectId
    image: string
}


const ServicesSchema =  new Schema<ServicesInterface>({
    locationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
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
    image: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: true
    },

})



const Services = mongoose.model('Services', ServicesSchema);
export default Services;