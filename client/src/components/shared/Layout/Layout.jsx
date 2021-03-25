import Footer from '../Footer/Footer';
import Nav from '../Navbar/Nav';

const Layout = ({ children, handleSearch, searchedValue, setSearch }) => (
  <div className="layout">
    <Nav
      handleSearch={handleSearch}
      searchedValue={searchedValue}
      setSearch={setSearch}
    />
    <div className="layout__children">{children}</div>
    <Footer />
  </div>
);

export default Layout;
