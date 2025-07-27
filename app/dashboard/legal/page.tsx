import PageHeader from "../_components/PageHeader";
import LegalInfoForm from "./LegalInfoForm";

const LegalPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Informations légales"
        description="Renseignez vos informations légales obligatoires, La loi impose d'afficher ces données dans une rubrique dédiée de votre site web."
      />
      <LegalInfoForm />
    </div>
  );
};

export default LegalPage;
