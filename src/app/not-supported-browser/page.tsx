export default async function Page() {
	return (
		<div className="flex flex-col gap-8 [&>p]:text-lg md:[&>p]:leading-loose md:text-center md:items-center">
			<h1 className="text-3xl font-bold">Your browser is not supported</h1>
			<p>
				If you open this page from in-app browser (e.g.&nbsp;Telegram):
				<br />
				<span className="underline underline-offset-4 font-semibold">
					click three dots at the top right corner and choose "Open in ..." option.
				</span>
			</p>
			<p>Otherwise, use another modern browser like Chrome, Firefox, or Safari.</p>
		</div>
	);
}
