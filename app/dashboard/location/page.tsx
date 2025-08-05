import PageHeader from "../_components/PageHeader";
import LocationForm from "./LocationForm";

const LocationPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Localisation"
        description="Configurez l'adresse de votre établissement"
      />
      <LocationForm />
    </div>
  );
};

export default LocationPage;
