import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { CURRENT_USER_QUERY } from "./User";
import { DropdownItem } from "reactstrap";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signoutUser {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signoutUser => (
      <DropdownItem style={{ cursor: "pointer" }} onClick={signoutUser}>
        Signout
      </DropdownItem>
    )}
  </Mutation>
);
export default Signout;
