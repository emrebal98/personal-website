export const Custom404 = () => <div />;

export const getServerSideProps = () => ({ redirect: { destination: '/', permanent: false } });

export default Custom404;
