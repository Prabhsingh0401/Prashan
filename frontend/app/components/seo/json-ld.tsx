"use client";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.9",
              "bestRating": "5",
              "reviewCount": "247"
            },
            "author": {
              "@type": "Person",
              "name": "Priya Sharma"
            },
            "review": {
              "@type": "Review",
              "reviewBody": "Prashan has completely transformed how I create exam papers. What used to take 3 hours now takes 3 minutes. The board alignment is perfect for CBSE curriculum.",
              "author": {
                "@type": "Person",
                "name": "Priya Sharma"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          })
        }}
      />
    </>
  );
}
