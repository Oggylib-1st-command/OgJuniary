import Header from "../../../components/admin/adminHeader/Header";
import Users from "../../../components/admin/adminUsers/Users";

function adminUsers() {
  return (
    <>
      <Header HeaderChoiceUser={true} HeaderChoiceBook={false} />
      <Users />
    </>
  );
}

export default adminUsers;
