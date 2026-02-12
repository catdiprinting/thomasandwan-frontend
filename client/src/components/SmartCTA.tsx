import { Link } from "wouter";

interface SmartCTAProps {
  mobileText?: string;
  desktopText?: string;
  className?: string;
  children?: React.ReactNode;
  "data-testid"?: string;
}

export default function SmartCTA({
  mobileText = "Call Now (713) 529-1177",
  desktopText = "Free Consultation",
  className = "",
  children,
  "data-testid": testId,
}: SmartCTAProps) {
  return (
    <>
      <a href="tel:713-529-1177" className={`md:hidden ${className}`} data-testid={testId}>
        {mobileText || children}
      </a>
      <Link href="/contact-us">
        <a className={`hidden md:inline-flex ${className}`} data-testid={testId}>
          {desktopText || children}
        </a>
      </Link>
    </>
  );
}
