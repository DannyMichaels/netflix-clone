import Footer from '../Footer/Footer';
import Nav from '../Navbar/Nav';

const Layout = ({ children, handleSearch, isSearching }) => (
  <div className="layout">
    <Nav handleSearch={handleSearch} isSearching={isSearching} />
    <div className="layout__children">{children}</div>
    <Footer />
  </div>
);

export default Layout;
