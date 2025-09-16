import { useState } from "react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Eye, Settings, Lightbulb } from "lucide-react";

import favicon from "@/assets/vite.svg";
import image from "@/assets/react.svg";

const ExampleComponents: React.FC = () => {
	const [activeExample, setActiveExample] = useState<number>(1);

	// Example 1: Basic useDocumentMeta
	useDocumentMeta({
		title: "Hook Usage Examples",
		description:
			"Complete guide to using useDocumentMeta hook for dynamic title and meta tag management in React applications.",
		keywords: ["React", "TypeScript", "SEO", "Meta Tags", "Dynamic Titles"],
		favicon: favicon,
		image: image,
		siteName: "Modern React Starter Kit",
		separator: "•",
	});

	const examples = [
		{
			id: 1,
			title: "Complete Meta Management",
			description: "Full SEO optimization with all available options",
			code: `useDocumentMeta({
  title: "Product Details",
  description: "Explore our amazing product with detailed specs",
  keywords: ["React", "TypeScript", "SEO"],
  favicon: "/icons/favicon.ico",
  image: "/images/social-share.jpg",
  siteName: "My E-commerce Store",
  separator: "•"
});
// Result: "Product Details • My E-commerce Store"`,
		},
		{
			id: 2,
			title: "Simple Title Update",
			description: "Basic title and site name combination",
			code: `useDocumentMeta({
  title: "Dashboard",
  siteName: "My App"
});
// Result: "Dashboard | My App" (default separator)`,
		},
		{
			id: 3,
			title: "Social Media Optimized",
			description: "Perfect for blog posts and social sharing",
			code: `useDocumentMeta({
  title: "10 React Tips for Better Performance",
  description: "Discover essential React optimization techniques that will boost your app's performance and user experience.",
  keywords: ["React", "Performance", "Optimization", "Web Development"],
  image: "/images/blog-react-tips.jpg",
  siteName: "DevBlog",
  separator: "—"
});
// Result: "10 React Tips for Better Performance — DevBlog"`,
		},
		{
			id: 4,
			title: "React Snap Integration",
			description: "SEO-friendly static generation with React Snap",
			code: `// package.json
"scripts": {
  "build": "vite build",
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "dist",
  "include": ["/", "/about", "/dashboard", "/login", "/register"],
  "skipThirdPartyRequests": true,
  "cacheAjaxRequests": false,
  "preloadImages": false,
  "minifyHtml": {
    "collapseWhitespace": false,
    "removeComments": false
  }
}

// Use with useDocumentMeta for perfect SEO
useDocumentMeta({
  title: "Home",
  description: "Modern MERN Stack Starter Kit...",
  keywords: ["MERN", "MongoDB", "Express", "React", "Node.js"],
  url: window.location.href,
  type: "website",
  author: "MERN Starter Team",
  robots: "index, follow",
  canonical: window.location.href
});`,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<Link to="/about">
						<Button variant="outline" className="mb-6">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to About
						</Button>
					</Link>
					<h1 className="text-4xl font-bold text-slate-800 mb-4">
						useDocumentMeta Hook Examples
					</h1>
					<p className="text-xl text-slate-600">
						Learn how to implement dynamic title and meta tag management in your
						React applications
					</p>
				</div>

				{/* Live Example Card */}
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-8">
					<div className="flex items-center mb-4">
						<Eye className="h-8 w-8 mr-3" />
						<h2 className="text-3xl font-bold">Live Example</h2>
					</div>
					<p className="text-blue-100 mb-4">
						This page is currently using the useDocumentMeta hook! Check your
						browser tab and page source to see the dynamic meta tags in action.
					</p>
					<div className="bg-blue-800 bg-opacity-50 p-4 rounded">
						<p className="text-sm">
							<strong>Current Page Title:</strong> Hook Usage Examples • Modern
							React Starter Kit
						</p>
						<p className="text-sm">
							<strong>Meta Description:</strong> Complete guide to using
							useDocumentMeta hook...
						</p>
						<p className="text-sm">
							<strong>Keywords:</strong> React, TypeScript, SEO, Meta Tags,
							Dynamic Titles
						</p>
					</div>
				</div>

				{/* Example Selection */}
				<div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200 mb-8">
					<h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
						<Settings className="mr-3" />
						Choose an Example
					</h2>
					<div className="grid md:grid-cols-3 gap-4 mb-6">
						{examples.map((example) => (
							<button
								key={example.id}
								onClick={() => setActiveExample(example.id)}
								className={`p-4 rounded-lg border-2 text-left transition-all ${
									activeExample === example.id
										? "border-blue-500 bg-blue-50"
										: "border-slate-200 hover:border-slate-300"
								}`}>
								<h3 className="font-semibold text-slate-800 mb-2">
									{example.title}
								</h3>
								<p className="text-sm text-slate-600">{example.description}</p>
							</button>
						))}
					</div>

					{/* Code Display */}
					<div className="bg-slate-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
						<div className="flex items-center mb-4">
							<Code className="h-5 w-5 mr-2" />
							<span className="text-slate-300">
								{examples.find((ex) => ex.id === activeExample)?.title}
							</span>
						</div>
						<pre className="whitespace-pre-wrap">
							{examples.find((ex) => ex.id === activeExample)?.code}
						</pre>
					</div>
				</div>

				{/* Implementation Guide */}
				<div className="grid md:grid-cols-2 gap-8 mb-8">
					<div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
						<h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
							<Lightbulb className="mr-3 text-yellow-500" />
							Best Practices
						</h3>
						<ul className="space-y-3 text-slate-600">
							<li className="flex items-start">
								<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>Use descriptive titles:</strong> Keep titles between
									50-60 characters for optimal SEO
								</span>
							</li>
							<li className="flex items-start">
								<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>Write compelling descriptions:</strong> Meta
									descriptions should be 150-160 characters
								</span>
							</li>
							<li className="flex items-start">
								<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>Include relevant keywords:</strong> Help search
									engines understand your content
								</span>
							</li>
							<li className="flex items-start">
								<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>Set social media images:</strong> Improve sharing
									appearance on social platforms
								</span>
							</li>
						</ul>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
						<h3 className="text-2xl font-bold text-slate-800 mb-4">
							Hook Features
						</h3>
						<div className="space-y-4">
							<div className="p-4 bg-slate-50 rounded border-l-4 border-blue-500">
								<h4 className="font-semibold text-slate-800">
									Dynamic Title Management
								</h4>
								<p className="text-sm text-slate-600">
									Automatically updates document title with siteName and
									separator
								</p>
							</div>
							<div className="p-4 bg-slate-50 rounded border-l-4 border-green-500">
								<h4 className="font-semibold text-slate-800">SEO Meta Tags</h4>
								<p className="text-sm text-slate-600">
									Manages description, keywords, and social media tags
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* TypeScript Integration */}
				<div className="bg-slate-800 text-white p-8 rounded-lg shadow-lg">
					<h3 className="text-2xl font-bold mb-6">TypeScript Integration</h3>
					<p className="text-slate-300 mb-4">
						All hooks are fully typed with TypeScript for enhanced developer
						experience:
					</p>
					<div className="bg-slate-900 p-4 rounded font-mono text-sm text-green-400">
						<pre>{`interface DocumentMetaOptions {
  title: string;
  description?: string;
  keywords?: string[];
  favicon?: string;
  image?: string;
  siteName?: string;
  separator?: string;
}`}</pre>
					</div>
					<p className="text-slate-300 mt-4 text-sm">
						TypeScript will provide intellisense and catch errors at compile
						time, ensuring robust meta tag management.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ExampleComponents;
