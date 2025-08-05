import TipCard from "@/components/TipCard";
import PageHeader from "../_components/PageHeader";
import QRCodesForm from "./QRCodesForm";

const QRCodesPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Codes QR"
        description="Générez des codes QR pour votre restaurant"
      />
      <TipCard>
        <p>
          Dans cette section, vous pouvez télécharger votre QR code
          personnalisé, qui permettra à vos clients d&apos;accéder facilement à
          votre site web, à votre carte ou de laisser un avis depuis leur
          smartphone. N&apos;hésitez pas à les télécharger et à les imprimer sur
          vos supports de communication tels que des flyers, des stickers ou des
          présentoirs.
        </p>
      </TipCard>
      <QRCodesForm />
    </div>
  );
};

export default QRCodesPage;
