import nodemailer from 'nodemailer';
import { auth } from '@googleapis/oauth2';

// new Authorized client
const OAuth2Client = new auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URL,
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function emailSender(emailContent) {
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

		const { to, subject, text, html } = emailContent;

		// email option
		const mailOptions = {
			from: 'Activity Tracker <activitytrackercpat@gmail.com>',
			to: to,
			subject: subject,
			text: text,
			html: html,
		};

		// Send the emails
		const info = await transport.sendMail(mailOptions);
		return info;
	} catch (error) {
		return error;
	}
}
