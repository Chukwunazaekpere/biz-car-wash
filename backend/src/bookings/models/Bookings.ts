import mongoose, { ObjectId, Schema } from "mongoose"
interface BookingsInterface {
    customerId: ObjectId
    date: Date
    status: string
    stringDate: string
    payment: string
    serviceType: string
    updatedBy: ObjectId
}

const paymentMethods = [
    "Cash",
    "Bank Transfer",
    "POS"
]

export enum bookingStatus {
    "Completed" = "Completed",
    "On-Course" = "On-Course",
    "Pending" = "Pending"
}
const BookingsSchema =  new Schema<BookingsInterface>({
    customerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true,
        enum: paymentMethods
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        required: false
    },
    stringDate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: bookingStatus
    }
})



const Bookings = mongoose.model('Bookings', BookingsSchema);
export default Bookings;