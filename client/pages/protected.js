import Layout from "../components/Layout/Layout";
import Protected from "../components/Protected";
import WithAuth from "../components/Hoc/WithAuth";

const ProtectedPage = props => (
  <Layout>
    <WithAuth>
      <Protected />
    </WithAuth>
  </Layout>
);

export default ProtectedPage;
