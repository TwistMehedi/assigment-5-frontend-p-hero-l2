export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-muted-foreground">
        At Movie Portal, we value your privacy. This Privacy Policy explains how
        we collect, use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Email address and account details</li>
        <li>Usage data such as pages visited and activity</li>
        <li>
          Payment information (processed securely via third-party providers)
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>To provide and improve our services</li>
        <li>To personalize user experience</li>
        <li>To process payments and subscriptions</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
      <p className="text-muted-foreground">
        We implement industry-standard security measures to protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="text-muted-foreground">
        We may use services like Stripe and Google for payments and
        authentication. These services have their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="text-muted-foreground">
        If you have any questions, contact us at: <b>ataul1708@gmail.com</b>
      </p>
    </div>
  );
}
