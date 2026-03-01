class ApiResponse {
	constructor(statuscode, data, message = "success"){
		this.statuscode = statuscode
		this.data = data
		this.success = statuscode < 400 // statuscode bigger then that are for failure like 404
		this.message = message
	}
}