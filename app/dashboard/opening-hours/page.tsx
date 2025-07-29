import PageHeader from "../_components/PageHeader";
import OpeningHoursForm from "./OpeningHoursForm";

const OpeningHoursPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Horaires d'ouverture"
        description="Configurez vos horaires d'ouverture"
      />
      <OpeningHoursForm />
    </div>
  );
};

export default OpeningHoursPage;
