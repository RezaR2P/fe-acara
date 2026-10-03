import { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { Button, Label, ListBox } from "@heroui/react";
import { CiLogout } from "react-icons/ci";
import { cn } from "@/utils/cn";

export interface SideBarItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface PropTypes {
  sideBarItems: SideBarItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardLayoutSidebar = ({
  sideBarItems,
  isOpen,
  onClose,
}: PropTypes) => {
  const router = useRouter();

  // Mencari item yang aktif berdasarkan pathname URL saat ini
  const activeItem = sideBarItems.find((item) =>
    router.pathname.startsWith(item.href),
  );

  return (
    <>
      {/* 1. Backdrop / Overlay hitam transparan saat sidebar terbuka di layar mobile */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose?.()}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* 2. Sidebar Panel */}
      <aside
        className={cn(
          // Posisi default di mobile: fixed melayang di atas, tersembunyi ke kiri (-translate-x-full)
          "border-default-200 bg-background fixed inset-y-0 left-0 z-50 flex h-screen w-full max-w-72 flex-col justify-between border-r px-4 py-6 transition-transform duration-300 ease-in-out",
          // Jika isOpen true di mobile, geser masuk (translate-x-0)
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Di layar desktop (lg ke atas): kembali static & selalu tampil normal
          "lg:static lg:translate-x-0",
        )}
      >
        {/* Bagian Atas: Logo & Navigasi */}
        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="cursor-pointer focus:outline-none"
          >
            <Image
              src="/images/general/logo.svg"
              alt="Logo"
              width={128}
              height={40}
              priority
              className="w-32"
            />
          </button>

          {/* Menu Navigasi */}
          <ListBox
            aria-label="Dashboard Menu"
            items={sideBarItems}
            selectionMode="single"
            selectedKeys={activeItem ? [activeItem.key] : []}
            onAction={(key) => {
              const target = sideBarItems.find((item) => item.key === key);
              if (target) {
                router.push(target.href);
                onClose?.(); // Otomatis tutup sidebar setelah memilih menu di mobile
              }
            }}
            className="w-full gap-1 p-0"
          >
            {(item) => (
              <ListBox.Item
                id={item.key}
                textValue={item.label}
                className={cn("h-11 rounded-lg px-3", {
                  // Style saat menu aktif
                  "bg-danger text-danger-foreground font-medium":
                    item.href === router.pathname,
                })}
              >
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-xl">{item.icon}</span>
                  <Label className="cursor-pointer text-sm">{item.label}</Label>
                </div>
              </ListBox.Item>
            )}
          </ListBox>
        </div>

        {/* Bagian Bawah: Tombol Logout */}
        <div className="border-default-100 border-t pt-4">
          <Button
            variant="danger"
            fullWidth
            size="lg"
            className="flex justify-start gap-2 rounded-lg px-3"
            onClick={() => signOut()}
          >
            <CiLogout className="text-xl" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default DashboardLayoutSidebar;
