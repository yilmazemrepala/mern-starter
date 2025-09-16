import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginRequest } from "../types/api";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Login: React.FC = () => {
	const [formData, setFormData] = useState<LoginRequest>({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { login, error, clearError } = useAuth();
	const navigate = useNavigate();

	// SEO meta tags
	useDocumentMeta({
		title: "Login",
		description: "Login to your MERN Starter account. Access your dashboard and manage your profile securely.",
		keywords: ["Login", "Sign In", "Authentication", "MERN Starter", "User Account", "Dashboard Access"],
		siteName: "MERN Starter",
		separator: "|",
		url: window.location.href,
		type: "website",
		author: "MERN Starter Team",
		robots: "noindex, nofollow", // Login pages shouldn't be indexed
		canonical: window.location.href,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (error) {
			clearError();
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			await login(formData);
			navigate("/");
		} catch (error) {
			// Error is handled by AuthContext
			console.error("Login failed:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6")}>
					<Card>
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-6">
									{error && (
										<div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
											{error}
										</div>
									)}
									<div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="m@example.com"
											value={formData.email}
											onChange={handleChange}
											required
											disabled={isSubmitting}
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="password">Password</Label>
										<Input
											id="password"
											name="password"
											type="password"
											placeholder="*******"
											value={formData.password}
											onChange={handleChange}
											required
											disabled={isSubmitting}
										/>
									</div>
									<div className="flex flex-col gap-3">
										<Button
											type="submit"
											className="w-full"
											disabled={isSubmitting}>
											{isSubmitting ? "Logging in..." : "Login"}
										</Button>
									</div>
								</div>
								<div className="mt-4 text-center text-sm">
									Don&apos;t have an account?{" "}
									<a href="/register" className="underline underline-offset-4">
										Sign up
									</a>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
