import React from 'react';

export function SchemaMarkup({ type, data }: { type: string; data: any }) {
  let schema: any = {};

  if (type === 'Article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      author: {
        '@type': 'Organization',
        name: 'Próximo Passo',
      }
    };
  } else if (type === 'HowTo') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.name,
      step: data.steps?.map((stepName: string, i: number) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: stepName,
      }))
    };
  } else if (type === 'FAQ') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions?.map((q: any) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.a,
        }
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
