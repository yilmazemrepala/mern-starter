import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const NotFound: React.FC = () => {
	// SEO meta tags - 404 sayfası için özel başlık
	useDocumentMeta({
		title: "404 - Page Not Found",
		description:
			"The page you are looking for could not be found. Please check the URL or return to the homepage.",
		keywords: ["404", "Page Not Found", "Error", "MERN Starter", "Not Found"],
		siteName: "MERN Starter",
		separator: "|",
		url: window.location.href,
		type: "website",
		author: "MERN Starter Team",
		robots: "noindex, nofollow", // 404 sayfaları indexlenmemeli
		canonical: window.location.href,
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Page Not Found
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
						The page you are looking for might have been removed, had its name
						changed, or is temporarily unavailable.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link to="/">
						<Button className="flex items-center gap-2">
							<Home className="w-4 h-4" />
							Go Home
						</Button>
					</Link>
					<Button
						variant="outline"
						onClick={() => window.history.back()}
						className="flex items-center gap-2">
						<ArrowLeft className="w-4 h-4" />
						Go Back
					</Button>
				</div>

				<div className="mt-12 text-sm text-gray-500">
					<p>If you believe this is an error, please contact support.</p>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
