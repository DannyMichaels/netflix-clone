import Footer from '../Footer/Footer';
import Nav from '../Navbar/Nav';

const Layout = ({ children, handleSearch }) => (
  <div className="layout">
    <Nav handleSearch={handleSearch} />
    <div className="layout__children">{children}</div>
    <Footer />
  </div>
);

export default Layout;
