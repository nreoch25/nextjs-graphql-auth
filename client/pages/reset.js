import Layout from "../components/Layout/Layout";
import Reset from "../components/Auth/Reset";

const ResetPage = props => (
  <Layout>
    <Reset resetToken={props.query.resetToken} />
  </Layout>
);

export default ResetPage;
