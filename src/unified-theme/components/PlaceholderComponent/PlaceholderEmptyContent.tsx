import { styled } from 'styled-components';

// TODO: Remove once cms-react implements the placeholder via EditorPlaceholder
const PlaceholderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: var(--hsElevate--spacing--32, 32px) var(--hsElevate--spacing--24, 24px) var(--hsElevate--spacing--12, 12px) var(--hsElevate--spacing--24, 24px);
  border: 1px dashed #516f90;
  background-color: #f5f8fae6;
  color: #425b76;
  h5 {
    margin-bottom: 0;
  }
  p {
    margin-bottom: var(--hsElevate--spacing--20, 20px);
    text-align: center;
  }
`;

type PlaceholderContentsProps = {
  title: string;
  description: string;
  icon?: string;
};

const StyledIcon = styled.img`
  margin-bottom: var(--hsElevate--spacing--10, 10px);
  filter: invert(0.5);
  width: var(--hsElevate--icon--medium__size, 24px);
`;

export const PlaceholderEmptyContent = (props: PlaceholderContentsProps) => {
  const { title, description, icon } = props;

  return (
    <PlaceholderWrapper>
      {icon && <StyledIcon src={icon} />}
      <h5>{title}</h5>
      <p>{description}</p>
    </PlaceholderWrapper>
  );
};
