type ArrowComponentProps = {
  fill?: string;
  additionalClassArray?: string[];
};

export default function ArrowComponent(props: ArrowComponentProps) {
  // This will eventually need to hook into theme settings / module settings
  const { fill = '#09152B', additionalClassArray = [] } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={additionalClasses}>
      <path
        className="hs-elevate-menu__arrow-path"
        d="M7.11807 7.61797C7.45986 7.27617 7.45986 6.72109 7.11807 6.3793L1.86807 1.1293C1.52627 0.787499 0.971191 0.787499 0.629395 1.1293C0.287598 1.47109 0.287598 2.02617 0.629395 2.36797L5.26143 7L0.632129 11.632C0.290332 11.9738 0.290332 12.5289 0.632129 12.8707C0.973926 13.2125 1.529 13.2125 1.8708 12.8707L7.1208 7.6207L7.11807 7.61797Z"
        fill={fill}
      />
    </svg>
  );
}
