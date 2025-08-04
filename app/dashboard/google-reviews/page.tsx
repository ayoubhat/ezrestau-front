import TipCard from "@/components/TipCard";
import PageHeader from "../_components/PageHeader";
import GoogleReviewsImport from "./GoogleReviewsImport";
import Link from "next/link";

const GoogleReviewsPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Avis Google"
        description="Importez et gérez les avis Google de votre restaurant pour renforcer votre crédibilité en ligne"
      />
      <TipCard>
        <h4 className="font-medium text-sm text-blue-800 ">
          Comment ça marche ?
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • Recherchez votre restaurant par nom et ville (vous devez disposer
            d'une fiche d'établissement Google. Si vous n'en avez pas, créez-la
            gratuitement&nbsp;
            <Link
              href="https://business.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              ici
            </Link>
            .)
          </li>
          <li>• Sélectionnez le bon établissement dans les résultats</li>
          <li>
            • Cliquez sur "Importer les avis" pour récupérer vos avis Google
          </li>
          <li>
            • Un aperçu de votre note globale ainsi que vos derniers avis sera
            automatiquement généré et affiché sur la page d'accueil de votre
            site.
          </li>
        </ul>
      </TipCard>
      <GoogleReviewsImport />
    </div>
  );
};

export default GoogleReviewsPage;
