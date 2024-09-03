import { envs } from "~/configs/envs";

export default function Page() {
	return (
		<div className="space-y-4 pb-8">
			<h1 className="text-3xl font-bold">Privacy Policy</h1>
			<h2>
				of{" "}
				<a
					className="underline underline-offset-4 hover:text-orange-500"
					href={`https://t.me/${envs.NEXT_PUBLIC_BOT_NAME}`}
					target="_blank"
					rel="noreferrer"
				>
					@make_them_smile_bot
				</a>
			</h2>
			<ol className="space-y-4 [&_h3]:font-bold [&_h3]:inline [&_h3]:text-lg [&_p]:leading-relaxed">
				<li>
					<h3>Purpose of the Bot:</h3>
					<p>
						This bot is exclusively intended <b>ONLY</b> for activities such as pranks, jokes, and
						controlled testing scenarios. It is designed to bring a light-hearted atmosphere and facilitate
						experimentation in a safe and responsible manner. Users are encouraged to engage in fun
						interactions while ensuring that all activities remain harmless and respectful.
					</p>
				</li>
				<li>
					<h3>Link Sharing Restrictions:</h3>
					<p>
						Please refrain from sharing the link with individuals you do not know personally. This is
						crucial to maintaining a safe environment for all users. Sharing the link with strangers can
						lead to misuse and inappropriate activities, which we actively monitor and manage to ensure
						compliance with our guidelines.
					</p>
				</li>
				<li>
					<h3>Data Privacy:</h3>
					<p>
						The bot and its associated website <b>DO NOT</b> store any personal user data beyond the user
						ID. We prioritize user privacy and security. Importantly, the bot{" "}
						<b>DOES NOT store any photos</b> that are sent. The workflow is straightforward: when you send a
						photo, it moves from the website to the bot and then directly to the end user, ensuring that no
						data is retained in the process.
					</p>
				</li>
				<li>
					<h3>Prohibited Content:</h3>
					<p>
						It is strictly forbidden to share a link for any requests that violate Telegram's rules or the
						laws of your country. We take this matter seriously; therefore, after receiving a photo, you
						have the option to send it to us for inspection. If a violation is confirmed, the IP address of
						the sender will be blocked from our system to maintain a safe and compliant environment.
					</p>
				</li>
				<li>
					<h3>False Complaints:</h3>
					<p>
						Submitting false complaints that clog our system is strictly prohibited and will be met with
						strong penalties. We rely on the integrity of our users to keep the system fair and efficient.
						Any attempts to misuse the complaint system will not be tolerated, and appropriate actions will
						be taken against offenders.
					</p>
				</li>
				<li>
					<h3>Respectful Use:</h3>
					<p>
						The bot is not intended to be used as a weapon for hacking or any malicious activities. It is a
						tool designed for entertainment and harmless fun. We urge all users to respect one another and
						uphold the privacy of others. Engaging in any form of harassment or invasion of privacy is
						unacceptable and will result in immediate action.
					</p>
				</li>
			</ol>
			<p className="font-semibold">
				By using the bot, you agree to adhere to these guidelines. Failure to comply with these rules will
				result in a ban from the service. Let's keep our community enjoyable and safe for everyone!
			</p>
		</div>
	);
}
