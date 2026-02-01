export default function BlogSchema({ post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.substring(0, 50),
    description: post.description.substring(0, 150),
    datePublished: post.createdAt,
    author: {
      "@type": "Person",
      name: "Admin",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
