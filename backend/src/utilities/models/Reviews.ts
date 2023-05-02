import mongoose, { ObjectId, Schema } from "mongoose"
interface ReviewsInterface {
    locationId: ObjectId
    customerId: ObjectId
    bookingId: ObjectId
    rating: number
    dateCreated: Date
    stringDate: string
    comments: string
}


const ReviewsSchema =  new Schema<ReviewsInterface>({
    locationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stringDate: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})



const Reviews = mongoose.model('Reviews', ReviewsSchema);
export default Reviews;