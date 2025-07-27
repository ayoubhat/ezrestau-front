import PageHeader from "../_components/PageHeader";
import SEOForm from "./SEOForm";

const SEOPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Optimisation pour les moteurs de recherche"
        description="Complétez ces champs pour améliorer la visibilité de votre restaurant sur Google et autres moteurs de recherche"
      />
      <SEOForm />
    </div>
  );
};

export default SEOPage;
