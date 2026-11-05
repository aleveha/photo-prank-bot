export async function register() {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const { register: registerNode } = await import("./instrumentation.node");
	await registerNode();
}
