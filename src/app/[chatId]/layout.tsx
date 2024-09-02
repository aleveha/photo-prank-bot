import type { PropsWithChildren } from "react";
import "./_styles.css";

export default function Layout({ children }: PropsWithChildren) {
	return <div className="chat_container">{children}</div>;
}
