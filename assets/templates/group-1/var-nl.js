var PURPOSES = {
    groups: [
        { value: 'AccountManagement', label: 'Accountbeheer' },
        { value: 'CommercialPurpose', label: 'Commerciële doeleinden' },
        { value: 'CommunicationManagement', label: 'Communicatiebeheer' },
        { value: 'CustomerManagement', label: 'Klantenbeheer' },
        { value: 'EnforceSecurity', label: 'Beveiliging handhaven' },
        { value: 'EstablishContractualAgreement', label: 'Contractuele overeenkomst opstellen' },
        { value: 'FulfilmentOfObligation', label: 'Naleving van verplichtingen' },
        { value: 'HumanResourceManagement', label: 'Personeelsbeheer (HR)' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'NonCommercialPurpose', label: 'Niet-commerciële doeleinden' },
        { value: 'OrganisationGovernance', label: 'Organisatiebestuur' },
        { value: 'Personalisation', label: 'Personalisatie' },
        { value: 'PublicBenefit', label: 'Algemeen nut' },
        { value: 'RecordManagement', label: 'Archiefbeheer' },
        { value: 'ResearchAndDevelopment', label: 'Onderzoek en ontwikkeling' },
        { value: 'ServiceProvision', label: 'Dienstverlening' },
        { value: 'VendorManagement', label: 'Leveranciersbeheer' },
        { value: 'HealthcareManagement', label: 'Beheer van de gezondheidszorg' }
    ],
    options: [
        { 
            group: '', 
            value: 'all:all', 
            name: 'All', 
            desc: 'Geen beperkingen op vlak van doeleinden.' 
        },
        { 
            group: 'AccountManagement', 
            value: 'dpv:AccountManagement', 
            name: 'AccountManagement (general)', 
            desc: 'Aanmaken, aanbieden, onderhouden en beheren van accounts.' 
        },
        { 
            group: 'CommercialPurpose', 
            value: 'dpv:CommercialPurpose', 
            name: 'CommercialPurpose (general)', 
            desc: 'Verwerkingsactiviteiten uitgevoerd in een commerciële context of met de intentie om te commercialiseren.' 
        },
        { 
            group: 'CommercialPurpose', 
            value: 'dpv:CommercialResearch', 
            name: 'CommercialResearch', 
            desc: 'Het uitvoeren van onderzoek in een commerciële context of met de intentie om te commercialiseren.' 
        },
        { 
            group: 'CommunicationManagement', 
            value: 'dpv:CommunicationManagement', 
            name: 'CommunicationManagement (general)', 
            desc: 'Het aanbieden of beheren van communicatieactiviteiten.' 
        },
        { 
            group: 'CommunicationManagement', 
            value: 'dpv:CommunicationForCustomerCare', 
            name: 'CommunicationForCustomerCare', 
            desc: 'Communicatie met klanten voor ondersteuning, probleemoplossing, het waarborgen van klantentevredenheid, enz. met betrekking tot de geleverde diensten.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerManagement', 
            name: 'CustomerManagement (general)', 
            desc: 'Beheren van activiteiten met betrekking tot voormalige, huidige en toekomstige klanten.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerCare', 
            name: 'CustomerCare', 
            desc: 'Bieden van ondersteuning, oplossen van problemen en waarborgen van klantentevredenheid met betrekking tot de geleverde diensten.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerClaimsManagement', 
            name: 'CustomerClaimsManagement', 
            desc: 'Beheer van claims en klachten, inclusief de terugbetaling van verschuldigde gelden.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerOrderManagement', 
            name: 'CustomerOrderManagement', 
            desc: "Beheer van klantbestellingen, d.w.z. de verwerking van een bestelling gerelateerd aan de aankoop van goederen of diensten door een klant."
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerRelationshipManagement', 
            name: 'CustomerRelationshipManagement', 
            desc: 'Beheren en analyseren van interacties met voormalige, huidige en potentiële klanten.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerSolvencyMonitoring', 
            name: 'CustomerSolvencyMonitoring', 
            desc: 'Opvolgen van de solvabiliteit van klanten in het kader van financiële zorgvuldigheid.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:EnforceSecurity', 
            name: 'EnforceSecurity (general)', 
            desc: 'Het waarborgen en handhaven van de beveiliging van gegevens, personeel of andere gerelateerde zaken.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:EnforceAccessControl', 
            name: 'EnforceAccessControl', 
            desc: 'Uitvoeren of afdwingen van toegangscontrole als beveiligingsmaatregel.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:IdentityAuthentication', 
            name: 'IdentityAuthentication', 
            desc: 'Uitvoeren van authenticatie op basis van identiteit als beveiligingsmaatregel.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:MisusePreventionAndDetection', 
            name: 'MisusePreventionAndDetection', 
            desc: 'Preventie en detectie van misbruik of oneigenlijk gebruik van diensten.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:Verification', 
            name: 'Verification', 
            desc: 'Doeleinden verbonden aan verificatie, bijv. van informatie, identiteit of integriteit.' 
        },
        { 
            group: 'EstablishContractualAgreement', 
            value: 'dpv:EstablishContractualAgreement', 
            name: 'EstablishContractualAgreement', 
            desc: 'Gegevensverwerking om een overeenkomst tot stand te brengen, zoals voor het afsluiten van een contract.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:FulfilmentOfObligation', 
            name: 'FulfilmentOfObligation (general)', 
            desc: 'Gegevensverwerking om een verplichting na te komen.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:FulfilmentOfContractualObligation', 
            name: 'FulfilmentOfContractualObligation', 
            desc: 'Gegevensverwerking om een contractuele verplichting na te komen.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:LegalCompliance', 
            name: 'LegalCompliance', 
            desc: 'Gegevensverwerking om te voldoen aan een wettelijke of reglementaire verplichting.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:ProtectionOfIPR', 
            name: 'ProtectionOfIPR', 
            desc: 'Doeleinden verbonden aan de bescherming van intellectuele eigendomsrechten.' 
        },
        { 
            group: 'HumanResourceManagement', 
            value: 'dpv:HumanResourceManagement', 
            name: 'HumanResourceManagement (general)', 
            desc: "Het beheren van mensen en 'human resources' binnen de organisatie voor een effectieve en efficiënte werking." 
        },
        { 
            group: 'HumanResourceManagement', 
            value: 'dpv:PersonnelManagement', 
            name: 'PersonnelManagement', 
            desc: 'Beheer van personeel verbonden aan de organisatie, bijv. evaluatie en beheer van werknemers en tussenpersonen.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:Marketing', 
            name: 'Marketing (general)', 
            desc: 'Doeleinden verbonden aan marketing voor de organisatie of haar producten en diensten, bijv. promotie, verkoop en distributie.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:Advertising', 
            name: 'Advertising', 
            desc: 'Het voeren van reclame, d.w.z. het proces om de aandacht te vestigen op een product of dienst via aankondigingen, berichten of andere communicatievormen.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:DirectMarketing', 
            name: 'DirectMarketing', 
            desc: 'Het uitvoeren van direct marketing, d.w.z. marketing die rechtstreeks naar het individu wordt gecommuniceerd.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:PublicRelations', 
            name: 'PublicRelations', 
            desc: 'Beheren en uitvoeren van public relations-processen, inclusief het creëren van goodwill voor de organisatie.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:SocialMediaMarketing', 
            name: 'SocialMediaMarketing', 
            desc: 'Het voeren van marketing via sociale media.' 
        },
        { 
            group: 'NonCommercialPurpose', 
            value: 'dpv:NonCommercialPurpose', 
            name: 'NonCommercialPurpose (general)', 
            desc: 'Verwerkingsactiviteiten uitgevoerd in een niet-commerciële context of zonder winstoogmerk.' 
        },
        { 
            group: 'NonCommercialPurpose', 
            value: 'dpv:NonCommercialResearch', 
            name: 'NonCommercialResearch', 
            desc: 'Het uitvoeren van onderzoek in een niet-commerciële setting, bijv. voor een non-profitorganisatie (vzw).' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationGovernance', 
            name: 'OrganisationGovernance (general)', 
            desc: 'Uitvoeren van activiteiten en functies voor het deugdelijk bestuur van een organisatie.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:DisputeManagement', 
            name: 'DisputeManagement', 
            desc: 'Activiteiten voor het beheer van geschillen door natuurlijke personen, private instanties of overheidsinstanties relevant voor de organisatie.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:MemberPartnerManagement', 
            name: 'MemberPartnerManagement', 
            desc: 'Bijhouden van een register van aandeelhouders, leden of partners voor bestuurs-, administratieve en beheersfuncties.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationComplianceManagement', 
            name: 'OrganisationComplianceManagement', 
            desc: 'Beheren van de naleving van het interne beleid van de organisatie.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationRiskManagement', 
            name: 'OrganisationRiskManagement', 
            desc: "Beheren van risico's voor de activiteiten van de organisatie." 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:Personalisation', 
            name: 'Personalisation (general)', 
            desc: 'Het creëren en aanbieden van maatwerk op basis van kenmerken en/of behoeften van personen of contexten.' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:PersonalisedAdvertising', 
            name: 'PersonalisedAdvertising', 
            desc: 'Het creëren en aanbieden van gepersonaliseerde advertenties.' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:PoliticalCampaign', 
            name: 'PoliticalCampaign', 
            desc: 'Politieke campagne-activiteiten gerelateerd aan de promotie van standpunten en kandidaten bij verkiezingen op lokaal, regionaal, nationaal of internationaal niveau.' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:ServicePersonalisation', 
            name: 'ServicePersonalisation', 
            desc: 'Het aanbieden van personalisatie binnen diensten, producten of activiteiten.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:PublicBenefit', 
            name: 'PublicBenefit (general)', 
            desc: 'Doeleinden die worden ondernomen om een voordeel te bieden aan het publiek of de samenleving.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:CombatClimateChange', 
            name: 'CombatClimateChange', 
            desc: 'Het bestrijden van de oorzaken en gevolgen van klimaatverandering, inclusief het verminderen van de uitstoot van gassen en het bestrijden van noodsituaties zoals overstromingen of bosbranden.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:Counterterrorism', 
            name: 'Counterterrorism', 
            desc: 'Activiteiten voor het detecteren, voorkomen of bestrijden van terrorisme.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:DataAltruism', 
            name: 'DataAltruism', 
            desc: 'Het vrijwillig delen van gegevens voor het algemeen belang, zoals voor de gezondheidszorg of de strijd tegen klimaatverandering.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImproveHealthcare', 
            name: 'ImproveHealthcare', 
            desc: 'Het verbeteren van de gezondheidszorgsystemen, bijv. voor gepersonaliseerde behandelingen en het genezen van chronische ziekten.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImprovePublicServices', 
            name: 'ImprovePublicServices', 
            desc: 'Het verbeteren van de publieke dienstverlening, zoals openbare veiligheid, onderwijs of rechtshandhaving.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImproveTransportMobility', 
            name: 'ImproveTransportMobility', 
            desc: 'Het verbeteren van het verkeer, het openbaar vervoer of de kosten voor bestuurders.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProtectionOfNationalSecurity', 
            name: 'ProtectionOfNationalSecurity', 
            desc: 'De bescherming van de nationale veiligheid.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProtectionOfPublicSecurity', 
            name: 'ProtectionOfPublicSecurity', 
            desc: 'De bescherming van de openbare veiligheid.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProvideOfficialStatistics', 
            name: 'ProvideOfficialStatistics', 
            desc: 'Het faciliteren van de ontwikkeling, productie en verspreiding van betrouwbare officiële statistieken.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:PublicPolicyMaking', 
            name: 'PublicPolicyMaking', 
            desc: 'Het uitstippelen van overheidsbeleid, zoals de ontwikkeling van nieuwe wetgeving.' 
        },
        { 
            group: 'RecordManagement', 
            value: 'dpv:RecordManagement', 
            name: 'RecordManagement', 
            desc: 'Het beheer van de creatie, opslag en het gebruik van registers relevant voor operaties, gebeurtenissen en processen, bijv. voor logs of toegangsverzoeken.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:ResearchAndDevelopment', 
            name: 'ResearchAndDevelopment (general)', 
            desc: 'Het uitvoeren van onderzoek en ontwikkeling voor nieuwe methoden, producten of diensten.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:AcademicResearch', 
            name: 'AcademicResearch', 
            desc: 'Het uitvoeren van of ondersteunen bij onderzoek in een academische context, bijv. binnen universiteiten.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:CommercialResearch', 
            name: 'CommercialResearch', 
            desc: 'Het uitvoeren van onderzoek in een commerciële setting of met het oog op commercialisering, bijv. binnen of gesponsord door een bedrijf.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:NonCommercialResearch', 
            name: 'NonCommercialResearch', 
            desc: 'Het uitvoeren van onderzoek in een niet-commerciële setting, bijv. voor een vzw of NGO.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:ScientificResearch', 
            name: 'ScientificResearch', 
            desc: 'Doeleinden verbonden aan wetenschappelijk onderzoek.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceProvision', 
            name: 'ServiceProvision (general)', 
            desc: 'Het leveren van een dienst, product of activiteiten.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:PaymentManagement', 
            name: 'PaymentManagement', 
            desc: 'Verwerking en beheer van betalingen in relatie tot de dienstverlening, inclusief facturatie en administratie.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:RepairImpairments', 
            name: 'RepairImpairments', 
            desc: 'Identificeren, corrigeren of uitvoeren van activiteiten bedoeld om defecten in bestaande functionaliteiten te herstellen.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:RequestedServiceProvision', 
            name: 'RequestedServiceProvision', 
            desc: 'Leveren van diensten zoals aangevraagd door de gebruiker of consument.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:SearchFunctionalities', 
            name: 'SearchFunctionalities', 
            desc: 'Het aanbieden van zoek-, query- of andere functionaliteiten voor het ophalen van informatie.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:SellProducts', 
            name: 'SellProducts', 
            desc: 'Doeleinden verbonden aan de verkoop van producten of diensten.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceOptimisation', 
            name: 'ServiceOptimisation', 
            desc: 'Optimalisatie van diensten of activiteiten.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServicePersonalisation', 
            name: 'ServicePersonalisation', 
            desc: 'Het aanbieden van personalisatie binnen diensten, producten of activiteiten.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceRegistration', 
            name: 'ServiceRegistration', 
            desc: 'Registreren van gebruikers en verzamelen van informatie die nodig is om een dienst te verlenen.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceUsageAnalytics', 
            name: 'ServiceUsageAnalytics', 
            desc: 'Het uitvoeren van analyses en rapportages met betrekking tot het gebruik van diensten of producten.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:TechnicalServiceProvision', 
            name: 'TechnicalServiceProvision', 
            desc: 'Beheren en aanbieden van technische processen en functies die nodig zijn voor het leveren van diensten.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorManagement', 
            name: 'VendorManagement (general)', 
            desc: 'Beheer van bestellingen, betalingen, evaluaties en prospectie met betrekking tot leveranciers.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorPayment', 
            name: 'VendorPayment', 
            desc: 'Doeleinden verbonden aan het beheer van betalingen aan leveranciers.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorRecordsManagement', 
            name: 'VendorRecordsManagement', 
            desc: 'Beheer van records en bestellingen met betrekking tot leveranciers.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorSelectionAssessment', 
            name: 'VendorSelectionAssessment', 
            desc: 'Beheer van de selectie, beoordeling en evaluatie van leveranciers.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:HealthcareManagement', 
            name: 'HealthcareManagement (general)', 
            desc: 'Beheer van de zorginfrastructuur en zorgverlening.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:HealthcareServiceManagement', 
            name: 'HealthcareServiceManagement', 
            desc: 'Beheer van de gezondheidsdiensten.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:InsuranceManagement', 
            name: 'InsuranceManagement', 
            desc: 'Beheer van verzekeringen als onderdeel van de zorgverlening.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:Optimisation', 
            name: 'Optimisation', 
            desc: 'Identificeren van optimalisaties voor het gebruik en de verstrekking van zorgdiensten.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:ResearchDevelopment', 
            name: 'ResearchDevelopment', 
            desc: 'Onderzoek en ontwikkeling met betrekking tot zorgdiensten.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:ResourceManagement', 
            name: 'ResourceManagement', 
            desc: 'Beheer van middelen en resources gerelateerd aan de zorgverlening.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:SecurityManagement', 
            name: 'SecurityManagement', 
            desc: 'Beheer van de beveiliging met betrekking tot zorgdiensten.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:WorkforceManagement', 
            name: 'WorkforceManagement', 
            desc: 'Beheer van het personeelsbestand betrokken bij de verstrekking van zorgdiensten.' 
        }
    ]
};

function generatePolicyText(p) {
    if (!p) return "Geen policy data meegegeven.";
    const con = p.constraints || {};

    //Base

    const permissionsMap = {
        read: "lezen",
        add: "toevoegen",
        modify: "aanpassen",
        manage: "beheren"
    };

    const perms = p.permissions || {};
    const allowedActions = Object.entries(perms)
        .filter(([_, val]) => val === true)
        .map(([key]) => {
            const cleanKey = key.replace('perm', '').toLowerCase();
            return permissionsMap[cleanKey] || cleanKey;
        });

    const actionsText = allowedActions.length > 0 ? joinList(allowedActions) : "raadplegen";

    //Purpose
    const purposes = con.purpose || [];
    let purposeSection = "";
    if (purposes.length > 0) {
        purposeSection = `
            <p>Zij mogen de gegevens alleen gebruiken voor de volgende doeleinden:</p>
            <ul>
                ${purposes.map(pt => {
                    const option = PURPOSES.options.find(opt => opt.value === pt);
                    return option
                        ? `<li><b>${option.name}</b> – ${option.desc}</li>`
                        : `<li>${pt}</li>`;
                }).join('')}
            </ul>`;
    }

    //Time restrictions
    let timeText = "";

    const durFields = ['DurationYear', 'DurationMonth', 'DurationDay', 'DurationHour'];
    const isDurationPresent = durFields.some(key => con[key] !== undefined && con[key] !== null && con[key] !== "");

    let totalDurationMs = Infinity;
    let durParts = [];

    if (isDurationPresent) {
        const durY = (parseInt(con.DurationYear) || 0) * 31536000000;
        const durM = (parseInt(con.DurationMonth) || 0) * 2628000000;
        const durD = (parseInt(con.DurationDay) || 0) * 86400000;
        const durH = (parseInt(con.DurationHour) || 0) * 3600000;
        totalDurationMs = durY + durM + durD + durH;

        if (parseInt(con.DurationYear) > 0) durParts.push(`${con.DurationYear} jaren`);
        if (parseInt(con.DurationMonth) > 0) durParts.push(`${con.DurationMonth} maanden`);
        if (parseInt(con.DurationDay) > 0) durParts.push(`${con.DurationDay} dagen`);
        if (parseInt(con.DurationHour) > 0) durParts.push(`${con.DurationHour} uren`);
    }

    const hasEnd = con.EndTime && con.EndTime !== "";
    const rangeMs = hasEnd ? (new Date(con.EndTime) - new Date(con.StartTime)) : Infinity;

    const startStr = new Date(con.StartTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    if (!isDurationPresent && !hasEnd) {
        timeText = `<p>De toegang start op <strong>${startStr}</strong>.</p>`;
    }
    else if (totalDurationMs <= rangeMs) {
        if (totalDurationMs === 0) {
            timeText = `<p>Deze overeenkomst verleent <strong>geen toegang</strong> (looptijd is 0).</p>`;
        } else {
            timeText = `<p>De overeenkomst verleent toegang voor <strong>${joinList(durParts)}</strong> (vanaf ${startStr}).</p>`;
        }
    }
    else {
        const endStr = new Date(con.EndTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        timeText = `<p>Deze toegang is geldig van <strong>${startStr}</strong> tot <strong>${endStr}</strong>.</p>`;
    }

    //Restrictions
    let extraRestrictions = "";
    if (con.Usage && con.Usage !== "0") {
        extraRestrictions += `<p>Het gebruik is beperkt tot een maximum van <strong>${con.Usage}</strong> keer.</p>`;
    }
    if (con.Location) {
        extraRestrictions += `<p>Toegang is beperkt tot de locatie: <strong>${con.Location}</strong>.</p>`;
    }

    //Duties
    const dutyMap = {
        delete: "alle gegevens verwijderen wanneer de toegang wordt ingetrokken",
        anonymize: "ervoor zorgen dat de gegevens worden geanonimiseerd",
        encrypt: "de gegevens versleuteld houden",
        notify: "u op de hoogte stellen telkens wanneer de gegevens worden geraadpleegd"
    };

    const activeDutyTexts = Object.entries(p.duties || {})
        .filter(([_, val]) => val === true)
        .map(([key]) => dutyMap[key]);
    
    let dutySection = "";
    if (activeDutyTexts.length > 0) {
        dutySection = `<p>Wat betreft verplichtingen, zijn zij verplicht om <strong>${joinList(activeDutyTexts)}</strong>.</p>`;
    }

    //Assembly
    return `
      <div class="policy-summary">
        <p>Deze policy (ID: <strong>${p.id}</strong>) verleent toegang tot <strong>${p.dataUri || 'de gegevens'}</strong> aan de consument <strong>${p.consumer || 'de consument'}</strong>.</p>
        <p>Zij mogen de gegevens <strong>${actionsText}</strong>; deze worden beschikbaar gesteld door <strong>${p.provider || 'de aanbieder'}</strong>.</p>
        
        ${purposeSection}
        ${timeText}
        ${extraRestrictions}
        ${dutySection}
      </div>
    `;
}
tiers = { 0: { label: "Geen Policies", color: "grey" }, 1: { label: "Lezen", color: "green" }, 2: { label: "Toevoegen", color: "yellow" }, 3: { label: "Bewerken", color: "orange" }, 4: { label: "Beheren", color: "red" } };
