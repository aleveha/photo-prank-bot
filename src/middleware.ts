import { NextResponse, type NextRequest } from "next/server";

/** Matches Next.js `SERVER_REFERENCE_ID_LENGTH` (see `server-reference-info.js`). */
const SERVER_REFERENCE_ID_LENGTH = 42;

/**
 * Reject junk `Next-Action` probes before Next's action handler runs.
 * Scanners send short values like `x`; real IDs are exactly 42 chars.
 * Without this, Next returns 400 anyway but still `console.warn`s the format error.
 */
export function middleware(request: NextRequest) {
	const actionId = request.headers.get("next-action");
	if (actionId !== null && actionId.length !== SERVER_REFERENCE_ID_LENGTH) {
		return new NextResponse("Invalid Server Action request.", { status: 400 });
	}

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"]
};
