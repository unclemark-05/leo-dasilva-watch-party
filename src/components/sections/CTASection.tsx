import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-arsenal-red/90 to-arsenal-red-dark/90 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white font-heading">
          Join Leo&apos;s Arsenal Family
        </h2>
        <p className="mt-3 text-white/80 text-lg font-sans normal-case">
          Free forever. RSVP to watch parties, join discussions, and never watch alone again.
        </p>
        <div className="mt-8">
          <Link href="/auth/signup">
            <Button
              variant="outline"
              size="lg"
              className="!border-white !text-white hover:!bg-white hover:!text-arsenal-red"
            >
              Sign Up Free
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/50 font-sans normal-case">
          COYG! No credit card needed. Ever.
        </p>
      </div>
    </section>
  );
}
