import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card hover={false} className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white font-heading">
            Join the Family
          </h1>
          <p className="mt-1 text-sm text-white/40 font-sans normal-case">
            Create your free account. COYG!
          </p>
        </div>

        <form className="space-y-4">
          <Input
            id="username"
            label="Username"
            type="text"
            placeholder="gooner_lagos"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="gooner@example.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
          />
          <Button className="w-full">Create Account</Button>
        </form>

        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-bg-card px-2 text-white/30">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-white/40 font-sans normal-case">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-arsenal-red hover:text-arsenal-red-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
