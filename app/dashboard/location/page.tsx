import PageHeader from "../_components/PageHeader";
import LocationForm from "./LocationForm";
import SearchPlace from "./SearchPalce";

const LocationPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Localisation"
        description="Configurez l'adresse de votre établissement"
      />
      <LocationForm />
      <SearchPlace />
    </div>
  );
};

export default LocationPage;
