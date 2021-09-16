import { apiCredentials } from './credentials';
import nodemailer from 'nodemailer';
import googleapis from 'googleapis';
const { google } = googleapis;
const OAuth2 = google.auth.OAuth2;

//tokens generated from google authenticator
const { clientId, clientSecret, redirectUrl, refreshToken } = apiCredentials;
//new Authorized client
const OAuth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
OAuth2Client.setCredentials({ refresh_token: refreshToken });

export async function emailSender(receiverEmail) {
	// TODO: Send actual OTP using nodemailer
	try {
		//getting the access token each time to send emails
		const accessToken = await OAuth2Client.getAccessToken();

		//Create a transport meduim for emails
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'activitytrackercpat@gmail.com',
				clientId: clientId,
				clientSecret: clientSecret,
				refreshToken: refreshToken,
				accessToken: accessToken,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		//email option
		const mailOptions = {
			from: 'Activity Tracker <activitytrackercpat@gmail.com>',
			to: receiverEmail,
			subject: 'Hello from Activity Tracker',
			text: 'Hello',
			html: '<b>Your OTP is 123456<b/>',
		};

		//Send the emails
		const info = await transport.sendMail(mailOptions);
		return info;
	} catch (error) {
		return error;
	}
}
