export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4 text-muted-foreground">
        By using Movie Portal, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>You must provide accurate information</li>
        <li>You are responsible for your account security</li>
        <li>You must not misuse the platform</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Subscriptions & Payments
      </h2>
      <p className="text-muted-foreground">
        Some features may require a paid subscription. Payments are processed
        securely via Stripe. All sales are final unless stated otherwise.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Content Usage</h2>
      <p className="text-muted-foreground">
        All content on Movie Portal is for personal use only. Redistribution or
        resale is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
      <p className="text-muted-foreground">
        We reserve the right to suspend or terminate accounts that violate our
        terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
      <p className="text-muted-foreground">
        We may update these terms at any time. Continued use means acceptance of
        changes.
      </p>
    </div>
  );
}
