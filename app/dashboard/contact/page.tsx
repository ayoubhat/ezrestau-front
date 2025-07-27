import PageHeader from "../_components/PageHeader";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Contact"
        description="Configurez vos informations de contact et réseaux sociaux"
      />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
