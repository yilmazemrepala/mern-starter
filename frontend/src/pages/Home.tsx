import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
	const [count, setCount] = useState<number>(0);
	const { isAuthenticated, user } = useAuth();

	// Dynamic title management
	useDocumentMeta({
		title: "Home",
		description: "Modern MERN Stack Starter Kit with MongoDB, Express, React, and Node.js. Build scalable web applications with TypeScript and Tailwind CSS.",
		keywords: ["MERN", "MongoDB", "Express", "React", "Node.js", "TypeScript", "Tailwind CSS", "Web Development", "Full Stack"],
		siteName: "MERN Starter",
		separator: "|",
		url: window.location.href,
		type: "website",
		author: "MERN Starter Team",
		robots: "index, follow",
		canonical: window.location.href,
	});

	return (
		<div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-slate-800">
					MERN Stack Starter Kit
				</h1>
				<p className="text-slate-600 text-lg">
					Modern web application with MongoDB + Express + React + Node.js
				</p>
				{isAuthenticated && (
					<p className="text-indigo-600 font-medium">Welcome, {user?.name}!</p>
				)}
			</div>

			<div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200 space-y-4">
				<div className="text-center">
					<p className="text-2xl font-semibold text-slate-700 mb-4">
						Counter: {count}
					</p>
					<div className="space-x-4">
						<Button
							onClick={() => setCount((count) => count + 1)}
							className="px-6 py-2">
							Increase (+)
						</Button>
						<Button
							variant="outline"
							onClick={() => setCount((count) => count - 1)}
							className="px-6 py-2">
							Decrease (-)
						</Button>
						<Button
							variant="destructive"
							onClick={() => setCount(0)}
							className="px-6 py-2">
							Reset
						</Button>
					</div>
				</div>
			</div>

			{/* Navigation Links */}
			<div className="flex flex-wrap gap-4 justify-center">
				<Link to="/about">
					<Button
						variant="secondary"
						className="px-6 py-2 space-x-2 border hover:bg-slate-200">
						<Info className="h-4 w-4" />
						<span>About Project</span>
					</Button>
				</Link>

				{isAuthenticated ? (
					<Link to="/dashboard">
						<Button className="px-6 py-2">Go to Dashboard</Button>
					</Link>
				) : (
					<div className="space-x-4">
						<Link to="/login">
							<Button variant="outline" className="px-6 py-2">
								Login
							</Button>
						</Link>
						<Link to="/register">
							<Button className="px-6 py-2">Register</Button>
						</Link>
					</div>
				)}
			</div>

			<div className="text-center text-slate-500">
				<p>Safe development with TypeScript! 🚀</p>
			</div>
		</div>
	);
};

export default Home;
