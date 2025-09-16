import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { RegisterRequest } from "../types/api";
import { useNavigate, Link } from "react-router-dom";
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

const Register: React.FC = () => {
	const [formData, setFormData] = useState<RegisterRequest>({
		name: "",
		email: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [validationError, setValidationError] = useState("");

	const { register, error, clearError } = useAuth();
	const navigate = useNavigate();

	// SEO meta tags
	useDocumentMeta({
		title: "Register",
		description: "Create a new MERN Starter account. Join our platform and start building amazing web applications.",
		keywords: ["Register", "Sign Up", "Create Account", "MERN Starter", "New User", "Registration"],
		siteName: "MERN Starter",
		separator: "|",
		url: window.location.href,
		type: "website",
		author: "MERN Starter Team",
		robots: "noindex, nofollow", // Registration pages shouldn't be indexed
		canonical: window.location.href,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "confirmPassword") {
			setConfirmPassword(value);
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		// Clear errors when user starts typing
		if (error) {
			clearError();
		}
		if (validationError) {
			setValidationError("");
		}
	};

	const validateForm = (): boolean => {
		if (formData.password !== confirmPassword) {
			setValidationError("Passwords do not match");
			return false;
		}

		if (formData.password.length < 6) {
			setValidationError("Password must be at least 6 characters");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isSubmitting) return;

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			await register(formData);
			navigate("/");
		} catch (error) {
			// Error is handled by AuthContext
			console.error("Registration failed:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const displayError = error || validationError;

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6")}>
					<Card>
						<CardHeader>
							<CardTitle>Create a new account</CardTitle>
							<CardDescription>
								Enter your information below to create your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="flex flex-col gap-6">
									{displayError && (
										<div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
											{displayError}
										</div>
									)}
									<div className="grid gap-3">
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											name="name"
											type="text"
											placeholder="John Doe"
											value={formData.name}
											onChange={handleChange}
											required
											disabled={isSubmitting}
										/>
									</div>
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
									<div className="grid gap-3">
										<Label htmlFor="confirmPassword">Confirm Password</Label>
										<Input
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											placeholder="*******"
											value={confirmPassword}
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
											{isSubmitting ? "Creating account..." : "Create Account"}
										</Button>
									</div>
								</div>
								<div className="mt-4 text-center text-sm">
									Already have an account?{" "}
									<Link to="/login" className="underline underline-offset-4">
										Sign in
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Register;
