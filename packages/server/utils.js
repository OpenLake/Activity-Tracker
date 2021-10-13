import nodemailer from 'nodemailer';
import googleapis from 'googleapis';
const { google } = googleapis;
const OAuth2 = google.auth.OAuth2;

// new Authorized client
const OAuth2Client = new OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIREC_URL,
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function emailSender(receiverEmail) {
	// TODO: Send actual OTP using nodemailer
	try {
		// getting the access token each time to send emails
		const accessToken = await OAuth2Client.getAccessToken();

		// Create a transport meduim for emails
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'activitytrackercpat@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// email option
		const mailOptions = {
			from: 'Activity Tracker <activitytrackercpat@gmail.com>',
			to: receiverEmail,
			subject: 'Hello from Activity Tracker',
			text: 'Hello',
			html: '<b>Your OTP is 123456<b/>',
		};

		// Send the emails
		const info = await transport.sendMail(mailOptions);
		return info;
	} catch (error) {
		return error;
	}
}
