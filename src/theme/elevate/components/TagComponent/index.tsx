type TagComponentProps = {
  children?: React.ReactNode;
  additionalClassArray?: string[];
};

export function TagComponent(props: TagComponentProps) {
  const { children = 'default', additionalClassArray } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return <span className={`hs-elevate-tag ${additionalClasses}`}>{children}</span>;
}
