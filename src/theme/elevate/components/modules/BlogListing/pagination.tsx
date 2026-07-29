import styles from './pagination.module.css';
import cx, { staticWithModule } from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import Chevron from './chevron.js';
import { usePageUrl } from '@hubspot/cms-components';

const swm = staticWithModule(styles);

// Types

type PaginationProps = {
  currentPageNumber: number;
  totalPageCount: number;
  nextPageNumber: number;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

// Helper functions

export function standardizePathName(currentPathName: string) {
  /*
   * If the pathname is '/' return an empty string
   * This is to avoid having a double slash in the basePagePath
   * This only happens if the blog is setup in the root directory of the website
   * or exists on a subdomain ex: https://blog.example.com/
   */

  return currentPathName === '/' ? '' : currentPathName;
}

export function buildPaginationNumbers(currentPageNumber: number, totalPageCount: number) {
  const standardizedPageNumbers = [-1, 0, 1];
  let displayFirstNumber = false;
  let displayLastNumber = false;
  let displayPreviousEllipsis = false;
  let displayNextEllipsis = false;

  /*
   * Threshold allows us to manipulate the array above(standardizedPageNumbers)
   * to change how many pages we want to display
   * without needing to change other parts of the function.
   */

  const threshold = Math.abs(standardizedPageNumbers[0]);

  if (totalPageCount <= standardizedPageNumbers.length) {
    /*
     * If we have less than the length of the standardizedPageNumbers array
     * Then just display all the pages.
     */

    return {
      pagesToDisplay: Array.from({ length: totalPageCount }, (_, i) => i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  /* ----------------- */
  // We now know that we have more than standardizedPageNumbers.length pages
  /* ----------------- */

  if (currentPageNumber <= threshold) {
    // If current page number is less than the threshold display standardizedPageNumbers.length
    displayLastNumber = true;
    displayNextEllipsis = true;
    return {
      pagesToDisplay: Array.from({ length: standardizedPageNumbers.length }, (_, i) => i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  if (currentPageNumber >= totalPageCount - threshold) {
    // Display the last standardized pages
    displayFirstNumber = true;
    displayPreviousEllipsis = true;
    return {
      pagesToDisplay: Array.from({ length: standardizedPageNumbers.length }, (_, i) => totalPageCount - standardizedPageNumbers.length + i + 1),
      displayFirstNumber,
      displayLastNumber,
      displayPreviousEllipsis,
      displayNextEllipsis,
    };
  }

  // display standardized pages around the current page
  displayFirstNumber = currentPageNumber !== threshold + 1;
  displayPreviousEllipsis = currentPageNumber !== threshold + 1;
  displayNextEllipsis = currentPageNumber !== totalPageCount - threshold - 1;
  displayLastNumber = true;
  return {
    pagesToDisplay: standardizedPageNumbers.map(pageNumber => currentPageNumber + pageNumber),
    displayFirstNumber,
    displayLastNumber,
    displayPreviousEllipsis,
    displayNextEllipsis,
  };
}

// Components

const PaginationContainer = createComponent('nav');
const PaginationLink = createComponent('a');
const NavLink = createComponent('a');

type ScreenReadyOnlyProps = {
  content: string;
};

const ScreenReadyOnly = (props: ScreenReadyOnlyProps) => {
  const { content } = props;

  return <span className={styles['hs-elevate-blog-listing__screen-ready-only']}>{content}</span>;
};

const Ellipsis = () => {
  return <a className={cx(styles['hs-elevate-blog-listing__ellipsis'], styles['hs-elevate-blog-listing__pagination-link'])}>...</a>;
};

export default function Pagination(props: PaginationProps) {
  const { currentPageNumber, totalPageCount, nextPageNumber, defaultContent } = props;

  const currentPathName = standardizePathName(usePageUrl().pathname);
  const pathNameWithoutPageInfo = currentPathName.replace(/\/page\/\d+/, '');
  const basePagePath = `${pathNameWithoutPageInfo}/page`;
  const nextPageUrl = `${basePagePath}/${nextPageNumber}`;
  const previousPageUrl = `${basePagePath}/${currentPageNumber > 1 ? currentPageNumber - 1 : 1}`;
  const enableNextButton = currentPageNumber < totalPageCount;
  const enablePreviousButton = currentPageNumber > 1;

  const { pagesToDisplay, displayFirstNumber, displayLastNumber, displayPreviousEllipsis, displayNextEllipsis } = buildPaginationNumbers(
    currentPageNumber,
    totalPageCount
  );

  const previousNavLinkClasses = cx(swm('hs-elevate-blog-listing__nav-link'), {
    [styles['hs-elevate-blog-listing__nav-link--disabled']]: !enablePreviousButton,
  });

  const chevronClasses = swm('hs-elevate-blog-listing__pagination-icon');

  const paginationLinkClasses = swm('hs-elevate-blog-listing__pagination-link');

  const nextNavLinkClasses = cx(swm('hs-elevate-blog-listing__nav-link'), { [styles['hs-elevate-blog-listing__nav-link--disabled']]: !enableNextButton });

  return (
    <PaginationContainer className={swm('hs-elevate-blog-listing__pagination-container')}>
      <NavLink className={previousNavLinkClasses} href={previousPageUrl}>
        <Chevron additionalClassArray={[chevronClasses, 'hs-elevate-helper--rotate-180', styles['hs-elevate-helper--rotate-180']]} />
        <ScreenReadyOnly content={defaultContent.previousPage} />
      </NavLink>

      {displayFirstNumber && (
        <PaginationLink className={paginationLinkClasses} href={`${basePagePath}/1`}>
          1
        </PaginationLink>
      )}
      {displayPreviousEllipsis && <Ellipsis />}
      {pagesToDisplay.map(index => (
        <PaginationLink
          className={cx(paginationLinkClasses, { [styles['hs-elevate-blog-listing__pagination-link--active']]: currentPageNumber === index })}
          key={index}
          href={`${basePagePath}/${index}`}
        >
          {index}
        </PaginationLink>
      ))}
      {displayNextEllipsis && <Ellipsis />}
      {displayLastNumber && (
        <PaginationLink className={paginationLinkClasses} href={`${basePagePath}/${totalPageCount}`}>
          {totalPageCount}
        </PaginationLink>
      )}
      <NavLink className={nextNavLinkClasses} href={nextPageUrl}>
        <Chevron additionalClassArray={[chevronClasses]} />
        <ScreenReadyOnly content={defaultContent.nextPage} />
      </NavLink>
    </PaginationContainer>
  );
}
