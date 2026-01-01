export const metadata = {
  title: "About Us | CG Wild Explore - Discover Chhattisgarh",
  description:
    "Learn about CG Wild Explore, a tourism blog dedicated to exploring the natural beauty, culture, temples, waterfalls, and hidden destinations of Chhattisgarh.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          About CG Wild Explore
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <strong>CG Wild Explore</strong> is a tourism-focused blog website dedicated
          to showcasing the rich culture, natural beauty, and hidden travel
          destinations of <strong>Chhattisgarh</strong>. Our mission is to help
          travelers discover the unexplored side of the state through detailed,
          informative, and inspiring travel content.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          What We Share
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          On CG Wild Explore, you will find well-researched articles on famous
          temples, breathtaking waterfalls, scenic mountains, historical places,
          tribal culture, and offbeat travel destinations. We aim to provide
          accurate travel information, travel tips, and location details to make
          your journey easier and more memorable.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Purpose
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Chhattisgarh is one of India’s most naturally beautiful yet
          lesser-known states. Through CG Wild Explore, we want to promote local
          tourism, support sustainable travel, and help people appreciate the
          cultural and historical importance of this region.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Why CG Wild Explore?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Focused on Chhattisgarh tourism</li>
          <li>Easy-to-read travel blogs</li>
          <li>SEO-friendly and informative content</li>
          <li>Future support for Hindi travel blogs</li>
        </ul>

        {/* Closing */}
        <p className="text-gray-700 leading-relaxed">
          Whether you are a traveler, photographer, student, or tourism lover,
          CG Wild Explore is your guide to discovering the true beauty of
          Chhattisgarh. Thank you for being a part of our journey.
        </p>
      </div>
    </div>
  );
}
