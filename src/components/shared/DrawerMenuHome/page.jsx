import { Drawer, Sidebar } from "flowbite-react"
import {
  HiClipboard,
  HiCollection,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi"
import { FaHouseChimney } from "react-icons/fa6"

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
                  <Sidebar.Item href="/" icon={FaHouseChimney}>
                    inicio
                  </Sidebar.Item>
                  <Sidebar.Item href="/candidato/registro" icon={HiUsers}>
                    Buscar Empleo
                  </Sidebar.Item>
                  <Sidebar.Item href="/empresa/registro" icon={HiShoppingBag}>
                    Registrar Empresa
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="/node_modules" icon={HiClipboard}>
                    Politicas de Privacidad
                  </Sidebar.Item>
                  <Sidebar.Item href="/" icon={HiCollection}>
                    Condiciones de uso
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
