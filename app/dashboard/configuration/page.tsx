import PageHeader from "../_components/PageHeader";
import ConfigurationForm from "./ConfigurationForm";

const ConfigurationPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Configuration générale"
        description="Gérez les informations de base de votre établissement"
      />
      <ConfigurationForm />
    </div>
  );
};

export default ConfigurationPage;
