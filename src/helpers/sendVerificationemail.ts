import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    username:string,
    verifycode: string,
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'NextMess | Verification Code ',
        react: VerificationEmail({username, otp:verifycode}),
        })
        return{success:true, message:"verification email send successfully"}
    } catch (emailerror) {
        console.log("Error sending verification email",emailerror);
        return{success:false, message:'Failed to send verification email'}

    }
}