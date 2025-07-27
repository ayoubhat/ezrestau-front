import PageHeader from "../_components/PageHeader";
import DeliveryServicesForm from "./DeliveryServicesForm";

const DeliveryPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Services de livraison"
        description="Gérez vos services de livraison, vos zones desservies et vos créneaux horaires."
      />
      <DeliveryServicesForm />
    </div>
  );
};

export default DeliveryPage;
