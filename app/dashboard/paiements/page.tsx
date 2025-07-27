import TipCard from "@/components/TipCard";
import PageHeader from "../_components/PageHeader";
import PaymentMethodsForm from "./PaymentMethodsForm";

const PaiementsPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Moyens de paiement"
        description="Sélectionnez les moyens de paiement acceptés dans votre restaurant."
      />
      <TipCard>
        <p>
          Les moyens de paiement sélectionnés seront visibles dans le pied de
          page de votre site web.
        </p>
      </TipCard>

      <PaymentMethodsForm />
    </div>
  );
};

export default PaiementsPage;
