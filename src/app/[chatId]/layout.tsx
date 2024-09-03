import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return <div className="w-full h-full flex flex-col justify-center items-center">{children}</div>;
}
