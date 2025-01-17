import ContentLoader from 'react-content-loader';

export const CategorySkeleton = () => (
  <ContentLoader
    speed={2}
    width={1136}
    height={450}
    viewBox='0 0 1136 450'
    backgroundColor='#fcd854'
    opacity='0.4'
    foregroundColor='#ecebeb'
  >
    <rect x='-326' y='-72' rx='52' ry='52' width='202' height='506' />
    <rect x='5' y='17' rx='10' ry='10' width='228' height='159' />
    <rect x='7' y='188' rx='10' ry='10' width='113' height='13' />
    <rect x='8' y='210' rx='10' ry='10' width='88' height='12' />
  </ContentLoader>
);
