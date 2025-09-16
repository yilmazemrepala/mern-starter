import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const Header: React.FC = () => {
	const { isAuthenticated, user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
			<div className="container mx-auto px-2 flex h-14 items-center justify-between">
				<div className="flex items-center">
					<Link to="/" className="flex items-center space-x-2">
						<span className="font-bold text-xl">MERN Starter</span>
					</Link>
				</div>
				<nav className="flex items-center justify-center space-x-4 lg:space-x-6">
					<Link
						to="/"
						className="text-sm font-medium transition-colors hover:text-primary">
						Home
					</Link>
					<Link
						to="/about"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
						About
					</Link>
					<Link
						to="/example-components"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
						Examples
					</Link>
					{isAuthenticated && (
						<Link
							to="/dashboard"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							Dashboard
						</Link>
					)}

					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="flex items-center space-x-2 border p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback>
											{user?.name?.charAt(0).toUpperCase() || "U"}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm font-medium hidden sm:inline-block">
										{user?.name}
									</span>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{user?.name}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{user?.email}
										</p>
									</div>
								</DropdownMenuLabel>

								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="text-red-600 focus:text-red-600 cursor-pointer">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex items-center space-x-4">
							<Link
								to="/login"
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
								Login
							</Link>
							<Link
								to="/register"
								className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1 rounded-md transition-colors hover:bg-primary/90">
								Register
							</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
