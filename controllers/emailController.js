const nodemailer = require("nodemailer");

const emailController = async (req, res) => {
    try {
        const auth = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'ap@taketwotechnologies.com',
                pass: 'qnptgosmkkhrwwuw'  // Make sure this is your App Password
            }
        });

        const receiver = {
            from: "ap@taketwotechnologies.com",
            to: "adityaparasharadiadi12@gmail.com",
            subject: 'Registration Successfully',
            text: "You Earned Points because you registered successfully"
        };

        await auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                res.send({
                    success: false,
                    status: 500,
                    message: 'Failed to send email',
                    error: error
                });
            } else {
                res.send({
                    success: true,
                    status: 200,
                    message: 'Email sent successfully',
                    emailResponse
                });
            }
        });
    } catch (error) {
        res.send({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            error: error
        });
    }
};

module.exports = emailController;
