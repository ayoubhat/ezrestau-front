import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background py-4 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Introduction
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                La présente Politique de confidentialité décrit la façon dont
                Restaurant Saveurs d'Italie collecte, utilise et protège les
                informations que vous nous fournissez lorsque vous utilisez
                notre site web.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous engageons à assurer la sécurité de vos informations
                personnelles. Nous vous demandons de fournir certaines
                informations personnelles par lesquelles vous pouvez être
                identifié lorsque vous utilisez ce site web. Soyez assuré
                qu'elles ne seront utilisées que conformément à cette
                déclaration de confidentialité.
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Données personnelles collectées
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Nous pouvons collecter les informations suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Adresse de livraison</li>
                <li>Préférences alimentaires et allergies</li>
                <li>Historique des commandes</li>
                <li>
                  Données de navigation (cookies, adresse IP, type de
                  navigateur)
                </li>
              </ul>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Utilisation de vos données
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Nous utilisons ces informations pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Traiter et livrer vos commandes</li>
                <li>Vous contacter concernant vos commandes</li>
                <li>Améliorer nos produits et services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>
                  Vous envoyer des informations promotionnelles (avec votre
                  consentement)
                </li>
                <li>Respecter nos obligations légales</li>
                <li>Analyser l'utilisation de notre site web</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Base légale du traitement
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Conformément au RGPD, nous traitons vos données personnelles sur
                les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">
                    Exécution du contrat :
                  </strong>{" "}
                  pour traiter vos commandes
                </li>
                <li>
                  <strong className="text-foreground">
                    Intérêt légitime :
                  </strong>{" "}
                  pour améliorer nos services
                </li>
                <li>
                  <strong className="text-foreground">Consentement :</strong>{" "}
                  pour les communications marketing
                </li>
                <li>
                  <strong className="text-foreground">
                    Obligation légale :
                  </strong>{" "}
                  pour respecter la réglementation
                </li>
              </ul>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Partage de vos données
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Nous ne vendons, n'échangeons ni ne louons vos informations
                personnelles à des tiers. Nous pouvons partager vos informations
                dans les cas suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Avec nos partenaires de livraison pour assurer la livraison de
                  vos commandes
                </li>
                <li>
                  Avec nos prestataires de services (paiement, hébergement,
                  support client)
                </li>
                <li>Si requis par la loi ou par une autorité compétente</li>
                <li>
                  Pour protéger nos droits, notre propriété ou notre sécurité
                </li>
              </ul>
            </div>
          </section>

          {/* Conservation des données */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Conservation des données
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Nous conservons vos données personnelles uniquement pendant la
                durée nécessaire aux finalités pour lesquelles elles ont été
                collectées :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">
                    Données de commande :
                  </strong>{" "}
                  3 ans après la dernière commande
                </li>
                <li>
                  <strong className="text-foreground">
                    Données de compte :
                  </strong>{" "}
                  jusqu'à suppression du compte
                </li>
                <li>
                  <strong className="text-foreground">
                    Données de navigation :
                  </strong>{" "}
                  13 mois maximum
                </li>
                <li>
                  <strong className="text-foreground">
                    Données comptables :
                  </strong>{" "}
                  10 ans (obligation légale)
                </li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Vos droits
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">Droit d'accès :</strong>{" "}
                  obtenir une copie de vos données
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit de rectification :
                  </strong>{" "}
                  corriger vos données inexactes
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit à l'effacement :
                  </strong>{" "}
                  supprimer vos données
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit à la limitation :
                  </strong>{" "}
                  limiter le traitement
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit à la portabilité :
                  </strong>{" "}
                  récupérer vos données
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit d'opposition :
                  </strong>{" "}
                  vous opposer au traitement
                </li>
                <li>
                  <strong className="text-foreground">
                    Droit de retrait du consentement :
                  </strong>{" "}
                  à tout moment
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à :{" "}
                <strong className="text-foreground">
                  privacy@saveurs-italie.fr
                </strong>
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Sécurité de vos données
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre la destruction, la perte, l'altération, la
                divulgation ou l'accès non autorisés. Ces mesures incluent le
                chiffrement des données, l'accès restreint aux données, la
                formation du personnel et la surveillance régulière de nos
                systèmes.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cookies et technologies similaires
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience.
                Nous utilisons :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">
                    Cookies essentiels :
                  </strong>{" "}
                  nécessaires au fonctionnement du site
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies de performance :
                  </strong>{" "}
                  pour analyser l'utilisation du site
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies de préférences :
                  </strong>{" "}
                  pour mémoriser vos choix
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Vous pouvez gérer vos préférences de cookies dans les paramètres
                de votre navigateur.
              </p>
            </div>
          </section>

          {/* Transferts internationaux */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Transferts internationaux
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles sont principalement traitées au sein de
                l'Union européenne. Si un transfert vers un pays tiers est
                nécessaire, nous nous assurerons qu'il bénéficie d'un niveau de
                protection adéquat conformément à la réglementation européenne.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Modifications de cette politique
            </h2>
            <div>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Les modifications seront publiées
                sur cette page avec une nouvelle date de mise à jour. Nous vous
                encourageons à consulter régulièrement cette page pour rester
                informé de la façon dont nous protégeons vos informations.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Contact
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette politique de
                confidentialité ou pour exercer vos droits :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email :</strong>{" "}
                  privacy@saveurs-italie.fr
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Téléphone :</strong> +33 1
                  23 45 67 89
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Adresse :</strong> 123 Rue
                  de la Gastronomie, 75001 Paris
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Vous avez également le droit de déposer une réclamation auprès
                de la Commission Nationale de l'Informatique et des Libertés
                (CNIL) si vous estimez que le traitement de vos données
                personnelles constitue une violation de la réglementation
                applicable.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
