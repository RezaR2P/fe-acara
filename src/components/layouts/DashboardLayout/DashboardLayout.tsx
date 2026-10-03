import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";

interface PropTypes {
  title?: string;
  children: ReactNode;
  type?: string;
  description?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, title, description, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title="title" />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sideBarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          {/* Ganti Navbar dengan header / nav biasa */}
          <header className="flex items-center justify-between bg-transparent px-0 pb-4">
            <h1 className="text-3xl font-bold">{title}</h1>

            {/* Tombol hamburger menu untuk layar mobile/tablet */}
            <button
              type="button"
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              /* Tambahkan z-50 di sini */
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center lg:hidden"
            >
              {/* Garis Atas */}
              <span
                className={`h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />

              {/* Garis Tengah */}
              <span
                className={`my-1.5 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Garis Bawah */}
              <span
                className={`h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </header>

          <p className="mb-4 text-sm">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
