import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./Template.js";
import { client , sender } from "./MailTrap.js";





export const sendVerificationEmail = async(email , code) => {
    const recipient = [{ email}]

    try {
        const res = await client.send({
            from: sender,
            to:recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , code),
            category: "Email Verification"
        })
        console.log("Email sent successfully",  res);
        
    } catch (error) {
        console.log(error.message)
        throw new Error(`Failed to send email ${error.message}`)
        
    }
}


export const WelcomeEmail = async(email , Uname) => {
    const recipient = [{email}]

    try {
        const res = await client.send({
            from: sender,
            to:recipient,
            template_uuid: "47da08fc-3065-4e07-b322-7bcb211e9e70",
            template_variables: {
            "name": Uname
    }
        })
        console.log("Email sent successfully",  res);
       
        
    } catch (error) {
        console.log(error.message)
        throw new Error(`Failed to send email ${error.message}`)
        
    }
}


export const PasswordRecover = async(email , code) => {
    const recipient = [{email}]

    try {
        const res = await client.send({
            from: sender,
            to:recipient,
            subject: "Email Verification",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace( "{resetURL}" , code),
            category: "Recovery Verification"
        })
        console.log("RecoveryEmail sent successfully",  res);
        
    } catch (error) {
        console.log(error.message)
        throw new Error(`Failed to send email ${error.message}`)
        
    }
}
export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};

