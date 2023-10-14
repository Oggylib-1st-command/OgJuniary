import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";
import Catalog from "../../../components/admin/adminCatalog/Catalog";

function adminCatalog() {
  return (
    <div style={{ background: "#d9d9d9" }}>
      <Header HeaderChoiceUser={false} HeaderChoiceBook={true} />
      <Search catalog={true} sort={true} button={true} exit={true} />
      <Catalog />
    </div>
  );
}

export default adminCatalog;
