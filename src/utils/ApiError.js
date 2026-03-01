class ApiError extends Error{
	constructor( statusCode, message = "something went wrong", errors = [], statck = ""){
		super(message) // here using super as our class extends another class
		this.statusCode = statusCode
		this.data = null
		this.message = message
		this.success = false; //as we are handling failures
		this.errors = errors
		if(statck){
			this.statck = statck
		} else {
			Error.captureStackTrace(this, this.constructor)
		}
	}
}

export {ApiError}