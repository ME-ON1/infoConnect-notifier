const SubsModel = require("../model/subscriber")

exports.userSubscribe = async (req,res,next)=> {
	const {email , name , batch } = req.body

	const userData = {
		email ,
		name ,
		batch
	}

	try {
		let user = await SubsModel.find({email : email}) ;
		if(user) {
			return res.status(401).json("Already a user !! ")
		}

		const newuser = await SubsModel.create(userData) ;
		return res.status(200).json({status : "OK" , newuser })


	}catch(err) {
		throw next(err)
	}
}

