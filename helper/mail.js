const nodemailer = require("nodemailer")
const ejs = require("ejs");

async function sendHelper(userData) {
	let testAccount = await nodemailer.createTestAccount() ;

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASS
		}

	});
	let info ;
	ejs.render("template", async (err,parsed)=>{
		if(!err) {
			info = await transporter.sendMail({
				email : userData.email ,
				subject : "Updates in InfoConnect" ,
				html : parsed
			})

			return info
		}else {
			console.log(err, "parsing err")
		}
	})
}


//sendHelper().then((res)=>{
	//console.log(res,"sdf")
//}).catch((err) =>{
	//console.log(err)
	//throw err ;
//})
