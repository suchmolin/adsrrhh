import { Drawer, Sidebar } from "flowbite-react"
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi"

export default function DrawerMenuHome({ isOpen, setIsOpen }) {
  const handleClose = () => setIsOpen(false)
  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header title="ADS RRHH" titleIcon={() => <></>} />
      <Drawer.Items>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="[&>div]:bg-transparent [&>div]:p-0"
        >
          <div className="flex h-full flex-col justify-between py-2">
            <div>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="/" icon={HiChartPie}>
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiShoppingBag}>
                    Products
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiUsers}>
                    Users list
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiLogin}>
                    Sign in
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiPencil}>
                    Sign up
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="/node_modules" icon={HiClipboard}>
                    Docs
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiCollection}>
                    Components
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiInformationCircle}>
                    Help
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  )
}
