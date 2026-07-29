import { ModuleMeta } from '../../types/modules.js';
import styles from './blog-listing.module.css';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import blogSVG from './assets/blog.svg';
import { withUrlPath } from '@hubspot/cms-components';
import BlogCardComponent from '../../BlogCardComponent/index.js';
import Pagination from './pagination.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';

const swm = staticWithModule(styles);

// Types

type BlogListingProps = HeadingAndTextFieldLibraryType & {
  hublData: {
    blogPosts: {
      id: number;
      title: string;
      featuredImage: string;
      featuredImageAltText: string;
      featuredImageWidth: number;
      featuredImageHeight: number;
      topicNames: string[];
      absoluteUrl: string;
    }[];
    currentPageNumber: number;
    nextPageNumber: number;
    totalPageCount: number;
    use_featured_image_in_summary: boolean;
  };
  serverSideProps: {
    gatedContentIds: number[];
  };
  groupStyle: CardStyleFieldLibraryType & HeadingStyleFieldLibraryType;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

// Components

const BlogListing = createComponent('div');
const BlogCardsContainer = createComponent('div');

export const Component = (props: BlogListingProps) => {
  if (!props?.hublData?.blogPosts) {
    return null; // or return an error message component
  }

  const {
    hublData: { blogPosts, currentPageNumber, nextPageNumber, totalPageCount, use_featured_image_in_summary },
    serverSideProps: { gatedContentIds = [] }, // Provide default empty array
    groupStyle: { headingStyleVariant, cardStyleVariant } = {}, // Provide default empty object
    headingAndTextHeadingLevel,
    defaultContent,
  } = props;

  const blogListingClasses = cx(swm('hs-elevate-blog-listing'), {
    [styles['hs-elevate-blog-listing--has-featured-post']]: (currentPageNumber === 1 || currentPageNumber === undefined) && use_featured_image_in_summary,
  });

  return (
    <BlogListing className={blogListingClasses}>
      <BlogCardsContainer className={swm('hs-elevate-blog-listing__blog-card-container')}>
        {blogPosts.map(post => {
          return (
            <BlogCardComponent
              key={post.id}
              post={{
                ...post,
                id: post.id.toString(),
              }}
              headingAndTextHeadingLevel={headingAndTextHeadingLevel}
              headingStyleVariant={headingStyleVariant}
              cardStyleVariant={cardStyleVariant}
              gatedContentIds={gatedContentIds.map(id => id.toString())}
              additionalClassArray={[swm('hs-elevate-blog-listing__blog-card')]}
            />
          );
        })}
      </BlogCardsContainer>
      <Pagination currentPageNumber={currentPageNumber} nextPageNumber={nextPageNumber} totalPageCount={totalPageCount} defaultContent={defaultContent} />
    </BlogListing>
  );
};

export { fields } from './fields.js';

export { default as hublDataTemplate } from './hubl_data.hubl.html?raw';

export const getServerSideProps = withUrlPath(fetchGatedPosts);

export const meta: ModuleMeta = {
  label: 'Blog listing',
  content_types: ['BLOG_LISTING'],
  icon: blogSVG,
  categories: ['blog'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/blog_listing',
  version: 0,
  themeModule: true,
};
