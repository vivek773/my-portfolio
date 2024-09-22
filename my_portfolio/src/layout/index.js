// Layout section

//components
import Header from '../component/header';
import Footer from '../component/footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div><Header /></div>
      <main>{children}</main>
      <div><Footer /></div>
    </div>
  )
} 

export default Layout;