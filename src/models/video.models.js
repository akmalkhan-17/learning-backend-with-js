import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
	{
		videoFile: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		duration: {
			type: Number, // we'll extract it from cloudinary response
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
		isPublished: {
			type: Boolean,
			default: true,
		}

	},
	{
		timestamps: true,
	}

)

Schema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)