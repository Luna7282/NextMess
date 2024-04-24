import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcrypt"
import { sendVerificationEmail } from "@/helpers/sendVerificationemail";

export async function POST (request:Request){
    await dbconnect()
    try {
       const {username,email,password} = await request.json()

       const existingUserVerifiedByUsername=await UserModel.findOne({
         username,
         isVerified:true,
       })
       if (existingUserVerifiedByUsername) {
         return Response.json({
         success: false,
         message: "Username already TTaken"
         },{
            status : 400
         })}
         const existingUserVerifiedByEmail = await UserModel.findOne({
            email
         })
         const verifycode = Math.floor(100000 + Math.random()*900000).toString()
         if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isVerified){
               return Response.json({
                  success: false,
                  message: "User already exist with this email"
               },{
                  status: 400
               })
             
            }
            else{
               const hashedPassword = await bcrypt.hash(password,10)
               existingUserVerifiedByEmail.password = hashedPassword;
               existingUserVerifiedByEmail.verifycode= verifycode;
               existingUserVerifiedByEmail.verifycodeExpiry=new Date(Date.now()+3600000)

               await existingUserVerifiedByEmail.save()
            }
         }
         else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

          const newUser=   new UserModel({
               username,
               email,
               password: hashedPassword,
               verifycode: verifycode,
               verifycodeExpiry: expiryDate,
               isVerified: false,
               isAcceptingMessage: true,
               messages: [],
            })
            await newUser.save()
         }// sending verification email
       const emailResponse =  await sendVerificationEmail(
         email,
         username,
         verifycode,
       )
       if(!emailResponse.success){
          return Response.json({
            success: false,
            message: emailResponse.message
         },{
            status: 500
         })
       }
       return Response.json({
         success: true,
         message: "User Registered Succesfully.Please verify your email"
      },{
         status: 200
      })
       }
     catch (error) {
     console.error("Error registering User", error)
     return Response.json({
        success: false,
        message : "Registering User failed"
     },{
        status:500
     })
    }
}