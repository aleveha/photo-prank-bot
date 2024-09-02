import "./_styles.css";

export default function Page() {
	return (
		<div className="privacy-policy_container">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
			<ol className="list-decimal list-inside space-y-4">
				<li>
					<b>Purpose of the Bot:</b>
					<br />
					This bot is exclusively intended <b>ONLY</b> for activities such as pranks, jokes, and controlled
					testing scenarios. It is designed to bring a light-hearted atmosphere and facilitate experimentation
					in a safe and responsible manner. Users are encouraged to engage in fun interactions while ensuring
					that all activities remain harmless and respectful.
				</li>
				<li>
					<b>Link Sharing Restrictions:</b>
					<br />
					Please refrain from sharing the link with individuals you do not know personally. This is crucial to
					maintaining a safe environment for all users. Sharing the link with strangers can lead to misuse and
					inappropriate activities, which we actively monitor and manage to ensure compliance with our
					guidelines.
				</li>
				<li>
					<b>Data Privacy:</b>
					<br />
					The bot and its associated website <b>DO NOT</b> store any personal user data beyond the user ID. We
					prioritize user privacy and security. Importantly, the bot <b>DOES NOT store any photos</b> that are
					sent. The workflow is straightforward: when you send a photo, it moves from the website to the bot
					and then directly to the end user, ensuring that no data is retained in the process.
				</li>
				<li>
					<b>Prohibited Content:</b>
					<br />
					It is strictly forbidden to share a link for any requests that violate Telegram's rules or the laws
					of your country. We take this matter seriously; therefore, after receiving a photo, you have the
					option to send it to us for inspection. If a violation is confirmed, the IP address of the sender
					will be blocked from our system to maintain a safe and compliant environment.
				</li>
				<li>
					<b>False Complaints:</b>
					<br />
					Submitting false complaints that clog our system is strictly prohibited and will be met with strong
					penalties. We rely on the integrity of our users to keep the system fair and efficient. Any attempts
					to misuse the complaint system will not be tolerated, and appropriate actions will be taken against
					offenders.
				</li>
				<li>
					<b>Respectful Use:</b>
					<br />
					The bot is not intended to be used as a weapon for hacking or any malicious activities. It is a tool
					designed for entertainment and harmless fun. We urge all users to respect one another and uphold the
					privacy of others. Engaging in any form of harassment or invasion of privacy is unacceptable and
					will result in immediate action.
				</li>
			</ol>
			<p className="mt-6 font-semibold">
				By using the bot, you agree to adhere to these guidelines. Failure to comply with these rules will
				result in a ban from the service. Let's keep our community enjoyable and safe for everyone!
			</p>
		</div>
	);
}
