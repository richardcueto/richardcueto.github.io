import Breadcrumb from "../../components/Common/Breadcrumb";
import Contact from "../../components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pagina de soporte"
        description=" En esta pagina encontraras todo lo relacionado a soporte"
      />

      <Contact />
    </>
  );
};

export default ContactPage;