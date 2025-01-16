import ContentLoader from 'react-content-loader';

export const CardSkeleton = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={400}
    viewBox='0 0 1200 400'
    backgroundColor='#fcd854'
    foregroundColor='#ecebeb'
  >
    <rect x='32' y='126' rx='0' ry='0' width='1' height='2' />
    <rect x='-326' y='-72' rx='52' ry='52' width='272' height='400' />
    <rect x='11' y='4' rx='12' ry='12' width='200' height='178' />
    <rect x='11' y='194' rx='10' ry='10' width='152' height='14' />
    <rect x='12' y='216' rx='10' ry='10' width='82' height='11' />
    <rect x='132' y='247' rx='10' ry='10' width='82' height='11' />
    <rect x='150' y='265' rx='10' ry='10' width='60' height='11' />
    <rect x='160' y='284' rx='10' ry='10' width='47' height='10' />
    <rect x='12' y='248' rx='10' ry='10' width='72' height='10' />
    <rect x='12' y='267' rx='10' ry='10' width='92' height='11' />
    <rect x='13' y='286' rx='10' ry='10' width='72' height='11' />
    <rect x='10' y='314' rx='10' ry='10' width='143' height='40' />
    <rect x='159' y='312' rx='10' ry='10' width='49' height='42' />
  </ContentLoader>
);
