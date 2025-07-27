import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const MentionsLegalesPage = () => {
  return (
    <div className="min-h-screen bg-background py-4 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mentions légales
          </h1>
          <p className="text-muted-foreground text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
        <div className="space-y-8">
          {/* Informations légales */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Informations légales
            </h2>
            <div className="space-y-3">
              <div>
                <strong className="text-foreground">Raison sociale :</strong>
                <span className="text-muted-foreground ml-2">
                  Restaurant Saveurs d'Italie SARL
                </span>
              </div>
              <div>
                <strong className="text-foreground">Forme juridique :</strong>
                <span className="text-muted-foreground ml-2">
                  Société à Responsabilité Limitée
                </span>
              </div>
              <div>
                <strong className="text-foreground">Capital social :</strong>
                <span className="text-muted-foreground ml-2">50 000 €</span>
              </div>
              <div>
                <strong className="text-foreground">SIRET :</strong>
                <span className="text-muted-foreground ml-2">
                  123 456 789 00012
                </span>
              </div>
              <div>
                <strong className="text-foreground">Code APE :</strong>
                <span className="text-muted-foreground ml-2">
                  5610A - Restauration traditionnelle
                </span>
              </div>
              <div>
                <strong className="text-foreground">
                  TVA Intracommunautaire :
                </strong>
                <span className="text-muted-foreground ml-2">
                  FR12345678901
                </span>
              </div>
            </div>
          </section>

          {/* Coordonnées */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Coordonnées
            </h2>
            <div className="space-y-3">
              <div>
                <strong className="text-foreground">Adresse :</strong>
                <span className="text-muted-foreground ml-2">
                  123 Rue de la Gastronomie, 75001 Paris
                </span>
              </div>
              <div>
                <strong className="text-foreground">Téléphone :</strong>
                <span className="text-muted-foreground ml-2">
                  01 23 45 67 89
                </span>
              </div>
              <div>
                <strong className="text-foreground">Email :</strong>
                <span className="text-muted-foreground ml-2">
                  contact@saveurs-italie.fr
                </span>
              </div>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Directeur de publication
            </h2>
            <div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Nom :</strong> Marco Rossi
                <br />
                <strong className="text-foreground">Qualité :</strong> Gérant
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Hébergement
            </h2>
            <div>
              <p className="text-muted-foreground">
                Ce site est hébergé par :<br />
                <strong className="text-foreground">Lovable</strong>
                <br />
                Adresse : San Francisco, CA, USA
                <br />
                Site web :{" "}
                <a
                  href="https://lovable.dev"
                  className="text-primary hover:underline"
                >
                  https://lovable.dev
                </a>
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Propriété intellectuelle
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                La reproduction de tout ou partie de ce site sur un support
                électronique ou autre quel qu'il soit est formellement interdite
                sauf autorisation expresse du directeur de publication.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Protection des données personnelles
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Conformément à la loi « Informatique et Libertés » du 6 janvier
                1978 modifiée et au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d'un droit d'accès, de
                rectification, de portabilité et d'effacement de vos données.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Pour exercer ces droits ou pour toute question sur le traitement
                de vos données, vous pouvez nous contacter à l'adresse :
                contact@saveurs-italie.fr
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cookies
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Ce site utilise des cookies pour améliorer l'expérience
                utilisateur et analyser le trafic. Les cookies sont de petits
                fichiers texte stockés sur votre ordinateur par votre navigateur
                web.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Vous pouvez configurer votre navigateur pour refuser les
                cookies, mais cela pourrait affecter certaines fonctionnalités
                du site.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Limitation de responsabilité
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Si vous constatez une lacune, erreur ou ce qui parait être un
                dysfonctionnement, merci de bien vouloir le signaler par email à
                contact@saveurs-italie.fr
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Droit applicable
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, les tribunaux français seront seuls
                compétents.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegalesPage;
