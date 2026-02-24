/**
 * About Section for EMP Pro
 * This will be reused inside LoginPage (left side panel)
 */

function AboutPage() {
  return (
    <div className="h-full flex flex-col justify-center px-8 text-white">
      <h1 className="text-4xl font-bold mb-4">EMP Pro</h1>

      <p className="text-lg text-indigo-100 leading-relaxed">
        EMP Pro is a powerful Employee Management System designed for modern
        organizations. Manage employees, track performance, and streamline
        administrative processes — all in one secure platform.
      </p>

      <div className="mt-6 space-y-2 text-indigo-200 text-sm">
        <p>✔ Multi-Tenant Secure Architecture</p>
        <p>✔ Role-Based Access Control</p>
        <p>✔ Real-Time Employee Insights</p>
        <p>✔ Scalable for Growing Businesses</p>
      </div>
    </div>
  );
}

export default AboutPage;
