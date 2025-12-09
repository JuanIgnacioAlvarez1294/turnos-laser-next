import { NextSeo } from 'next-seo';

const SEO = ({
  title,
  description,
  canonical,
  openGraph,
}: {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    url?: string;
    title?: string;
    description?: string;
    images?: { url: string; alt?: string }[];
    site_name?: string;
  };
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        url: openGraph?.url || '',
        title: openGraph?.title || title,
        description: openGraph?.description || description,
        images: openGraph?.images || [],
        site_name: openGraph?.site_name || 'Turnos Láser',
      }}
    />
  );
};

export default SEO;