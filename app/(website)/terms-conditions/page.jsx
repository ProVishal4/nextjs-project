export const metadata = {
  title: "Terms and Conditions | CG Wild Explore",
  description:
    "Read the terms and conditions for using CG Wild Explore – a tourism and travel information platform.",
};

export default function TermsAndConditions() {
  return (
    <main className="bg-gray-50 dark:bg-zinc-700 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white dark:bg-[#333030] rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-200 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: <span className="font-medium">02/01/2026</span>
        </p>

        {/* Introduction */}
        <section className="mb-6">
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            Welcome to <strong> CG Wild Explore </strong>. By accessing and
            using this website, you accept and agree to be bound by the terms
            and conditions described below. If you do not agree with any part of
            these terms, please do not use our website.
          </p>
        </section>

        {/* Use of Website */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Use of the Website
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            The content on this website is provided for general informational
            and educational purposes related to tourism, travel destinations,
            culture, and heritage. You agree to use this website only for lawful
            purposes and in a way that does not infringe the rights of others.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Intellectual Property Rights
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            Unless otherwise stated, all content published on this website,
            including text, images, graphics, and logos, is the intellectual
            property of <strong> CG Wild Explore </strong>. You may view,
            download, and print pages for personal, non-commercial use only.
          </p>
        </section>

        {/* User Content */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            User-Generated Content
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            If you submit comments, feedback, or other content, you grant us a
            non-exclusive, royalty-free right to use, reproduce, and display
            such content on our website. You are responsible for ensuring that
            your content does not violate any laws or third-party rights.
          </p>
        </section>

        {/* External Links */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            External Links
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            Our website may contain links to third-party websites. We do not
            control or take responsibility for the content, privacy policies, or
            practices of any external sites.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            <strong> CG Wild Explore </strong> shall not be held liable for any
            loss or damage arising from the use of this website, including but
            not limited to indirect or consequential loss.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Disclaimer
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            All information on this website is provided on an “as is” basis. We
            make no warranties regarding accuracy, completeness, or reliability
            of the content.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Changes to These Terms
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            We reserve the right to update or change these Terms and Conditions
            at any time without prior notice. Continued use of the website means
            you accept those changes.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Governing Law
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            These terms shall be governed and interpreted in accordance with the
            laws of <strong>India</strong>.
          </p>
        </section>

        {/* Contact */}
        <section className="hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p className="mt-2 text-gray-800 dark:text-zinc-200 font-medium hidden">
            📧 Email: <span className="text-blue-600"> CG Wild Explore </span>
          </p>
        </section>
      </div>
    </main>
  );
}
