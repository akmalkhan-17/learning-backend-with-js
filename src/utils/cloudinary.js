import {v2 as cloudinary} from 'cloudinary';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

const uploadFile = async (filePath) => {
	try {
		if(!filePath) return null
		const response = await cloudinary.uploader.upload(filePath, {
			resource_type: "auto",
		})
		//file ho gayi upload
		console.log("file uploaded at ",response.url)
		return response

	} catch (error) {
		fs.unlinkSync(filePath)
		console.log("Error while uploading file to cloudinary", error)
		return null
	}
}