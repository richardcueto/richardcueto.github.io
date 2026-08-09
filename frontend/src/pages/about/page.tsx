import AboutSectionOne from "../../components/About/AboutSectionOne";
import AboutSectionTwo from "../../components/About/AboutSectionTwo";
import Breadcrumb from "../../components/Common/Breadcrumb";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pagina de acerca de"
        description="Esta es la pagina de acerca de"
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;