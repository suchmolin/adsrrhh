import { Footer } from "flowbite-react"
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs"
import { FiPhone } from "react-icons/fi"
import { FaInstagram } from "react-icons/fa"
import { MdOutlineMail } from "react-icons/md"
import { GrLocation } from "react-icons/gr"

export default function FooterHome() {
  const classContact = "inline text-primary mr-2 text-lg"
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src="/img/logoadsrrhh2.png"
              alt="ADS RRHH Logo"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-8 sm:mt-4 grid-cols-1 sm:gap-6 lg:pr-32">
            <div>
              <Footer.Title title="Contacto" className="text-primary" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="flex items-center">
                  <FiPhone className={classContact} />
                  <span>+584123408754</span>
                </Footer.Link>
                <Footer.Link href="#" className="flex items-center">
                  <FaInstagram className={classContact} />
                  <span>@adsrrhh</span>
                </Footer.Link>
                <Footer.Link href="#" className="flex items-center">
                  <MdOutlineMail className={classContact} />
                  <span>info@adsrrhh.com</span>
                </Footer.Link>
                <Footer.Link href="#" className="flex items-center">
                  <GrLocation className={classContact} />
                  <span>Torre A piso 5 Oficina 503 CCCT</span>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Resgistro" className="text-primary" />
              <Footer.LinkGroup col>
                <Footer.Link href="/candidato/registro">Candidato</Footer.Link>
                <Footer.Link href="#">Empresa</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-primary" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Política de privacidad</Footer.Link>
                <Footer.Link href="#">Términos y condiciones</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="ADS RRHH" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
