import TipCard from "@/components/TipCard";
import PageHeader from "../_components/PageHeader";
import ServicesForm from "./ServicesForm";

const ServicesPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Services proposés"
        description="Sélectionnez les services proposés par votre établissement"
      />
      <TipCard>
        <p>
          Sélectionnez au moins 3 services pour les afficher dans la section
          <span className="font-medium"> &quot;Nos Services&quot; </span>dans la
          page d&apos;accueil de votre site web. Nous recommandons de choisir
          jusqu&apos;à 6 services au maximum pour une meilleure présentation.
          Choisissez ceux qui représentent le mieux votre restaurant.
        </p>
      </TipCard>
      <ServicesForm />
    </div>
  );
};

export default ServicesPage;
