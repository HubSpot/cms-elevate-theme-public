import styles from './placeholder.module.css';
import { createComponent } from '../utils/create-component.js';

// Types

type PlaceholderContentsProps = {
  title: string;
  description: string;
  icon?: string;
};

// Components

// TODO: Remove once cms-react implements the placeholder via EditorPlaceholder
const PlaceholderWrapper = createComponent('div');
const PlaceholderIcon = createComponent('img');

export const PlaceholderEmptyContent = (props: PlaceholderContentsProps) => {
  const { title, description, icon } = props;

  return (
    <PlaceholderWrapper className={styles['hs-elevate-placeholder']}>
      {icon && <PlaceholderIcon className={styles['hs-elevate-placeholder__icon']} src={icon} />}
      <h5>{title}</h5>
      <p>{description}</p>
    </PlaceholderWrapper>
  );
};
