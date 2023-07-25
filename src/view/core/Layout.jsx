import Footer from "../components/footer";
import Header from "../components/header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="h-screen grid grid-cols-2 place-content-center bg-[url('../assets/images/noise.svg')] bg-[#262624]">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
