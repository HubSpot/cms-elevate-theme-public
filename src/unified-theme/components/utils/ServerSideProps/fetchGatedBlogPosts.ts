import { ModulePropsWithoutSSP, URLWithoutQuery } from '@hubspot/cms-components';

export type FetchGatedPostsProps = ModulePropsWithoutSSP & {
  hublData: {
    blogPostIds: number[];
  };
};

export function cleanHostName(hostname: string) {
  if (!hostname.includes('.hslocal.net')) return hostname;

  return hostname.replace('.hslocal.net', '');
}

const fetchGatedPosts = async (props: FetchGatedPostsProps, { url }: { url: URLWithoutQuery }) => {
  if (!props?.hublData?.blogPostIds?.length) {
    console.warn('No blog post IDs provided');
    return {
      serverSideProps: { gatedContentIds: [] },
      caching: {
        cacheControl: {
          maxAge: 60,
        },
      },
    };
  }

  const {
    hublData: { blogPostIds: idsToCheck },
  } = props;

  if (!url || !url.hostname) {
    throw new Error('Missing hostname in URL');
  }

  const cleanedHostname = cleanHostName(url.hostname);

  const options = {
    method: 'POST',
    body: JSON.stringify({ contentIds: idsToCheck }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`https://${cleanedHostname}/_hcms/content-access/get-gated-content-ids-for-member`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.gatedContentIds)) {
      throw new Error('Invalid response format for gated content IDs');
    }

    return {
      serverSideProps: { gatedContentIds: data.gatedContentIds },
      caching: {
        cacheControl: {
          maxAge: 60,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching gated posts:', error);
    // Return empty array instead of throwing to prevent complete failure
    return {
      serverSideProps: { gatedContentIds: [] },
      caching: {
        cacheControl: {
          maxAge: 60,
        },
      },
    };
  }
};

export default fetchGatedPosts;
