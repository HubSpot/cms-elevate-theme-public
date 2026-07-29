type ChevronProps = {
  additionalClassArray?: string[];
};

export default function Chevron(props: ChevronProps) {
  const { additionalClassArray } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none" className={additionalClasses}>
      <path
        d="M8.20786 6.29377C8.59849 6.6844 8.59849 7.31877 8.20786 7.7094L2.20786 13.7094C1.81724 14.1 1.18286 14.1 0.792236 13.7094C0.401611 13.3188 0.401611 12.6844 0.792236 12.2938L6.08599 7.00002L0.795361 1.70627C0.404736 1.31565 0.404736 0.681274 0.795361 0.290649C1.18599 -0.0999756 1.82036 -0.0999756 2.21099 0.290649L8.21099 6.29065L8.20786 6.29377Z"
        fill="#4F38E0"
      />
    </svg>
  );
}
