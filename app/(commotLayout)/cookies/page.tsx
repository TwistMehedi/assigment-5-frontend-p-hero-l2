export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4 text-muted-foreground">
        This Cookie Policy explains how Movie Portal uses cookies and similar
        technologies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What Are Cookies?</h2>
      <p className="text-muted-foreground">
        Cookies are small text files stored on your device to improve your
        browsing experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Cookies</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>To remember user preferences</li>
        <li>To analyze website traffic</li>
        <li>To improve performance and user experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Cookies</h2>
      <p className="text-muted-foreground">
        We may use third-party services like Google Analytics which may set
        cookies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Managing Cookies</h2>
      <p className="text-muted-foreground">
        You can control or disable cookies through your browser settings.
      </p>
    </div>
  );
}
