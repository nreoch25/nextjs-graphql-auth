import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Auth/User";
import Signin from "../Auth/Signin";

const WithAuth = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <Signin text="Please sign in to access page" />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default WithAuth;
