import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div>
      {/* nav bar */}
      <Header />
      {/* {page contents} */}
      <main className="main vh-100">
        {" "}
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};
