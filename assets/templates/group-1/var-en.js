var PURPOSES = {
    groups: [
        { value: 'AccountManagement', label: 'AccountManagement' },
        { value: 'CommercialPurpose', label: 'CommercialPurpose' },
        { value: 'CommunicationManagement', label: 'CommunicationManagement' },
        { value: 'CustomerManagement', label: 'CustomerManagement' },
        { value: 'EnforceSecurity', label: 'EnforceSecurity' },
        { value: 'EstablishContractualAgreement', label: 'EstablishContractualAgreement' },
        { value: 'FulfilmentOfObligation', label: 'FulfilmentOfObligation' },
        { value: 'HumanResourceManagement', label: 'HumanResourceManagement' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'NonCommercialPurpose', label: 'NonCommercialPurpose' },
        { value: 'OrganisationGovernance', label: 'OrganisationGovernance' },
        { value: 'Personalisation', label: 'Personalisation' },
        { value: 'PublicBenefit', label: 'PublicBenefit' },
        { value: 'RecordManagement', label: 'RecordManagement' },
        { value: 'ResearchAndDevelopment', label: 'ResearchAndDevelopment' },
        { value: 'ServiceProvision', label: 'ServiceProvision' },
        { value: 'VendorManagement', label: 'VendorManagement' },
        { value: 'HealthcareManagement', label: 'HealthcareManagement' }
    ],
    options: [
        {
            group: '', 
            value: 'all:all', 
            name: 'All', 
            desc: 'No purpose limitations' 
        },
        { 
            group: 'AccountManagement', 
            value: 'dpv:AccountManagement', 
            name: 'AccountManagement (general)', 
            desc: 'Create, provide, maintain, and manage accounts.' 
        },
        { 
            group: 'CommercialPurpose', 
            value: 'dpv:CommercialPurpose', 
            name: 'CommercialPurpose (general)', 
            desc: 'Processing activities performed in a commercial setting or with intention to commercialise.' 
        },
        { 
            group: 'CommercialPurpose', 
            value: 'dpv:CommercialResearch', 
            name: 'CommercialResearch', 
            desc: 'Conducting research in a commercial setting or with intention to commercialise.' 
        },
        { 
            group: 'CommunicationManagement', 
            value: 'dpv:CommunicationManagement', 
            name: 'CommunicationManagement (general)', 
            desc: 'Providing or managing communication activities.' 
        },
        { 
            group: 'CommunicationManagement', 
            value: 'dpv:CommunicationForCustomerCare', 
            name: 'CommunicationForCustomerCare', 
            desc: 'Communicating with customers for assisting them, resolving issues, ensuring satisfaction, etc. in relation to services provided.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerManagement', 
            name: 'CustomerManagement (general)', 
            desc: 'Managing activities related with past, current, and future customers.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerCare', 
            name: 'CustomerCare', 
            desc: 'Providing assistance, resolving issues, ensuring satisfaction, etc. in relation to services provided.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerClaimsManagement', 
            name: 'CustomerClaimsManagement', 
            desc: 'Managing claims, including repayment of monies owed.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerOrderManagement', 
            name: 'CustomerOrderManagement', 
            desc: "Managing customer orders i.e. processing of an order related to customer's purchase of good or services."
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerRelationshipManagement', 
            name: 'CustomerRelationshipManagement', 
            desc: 'Managing and analysing interactions with past, current, and potential customers.' 
        },
        { 
            group: 'CustomerManagement', 
            value: 'dpv:CustomerSolvencyMonitoring', 
            name: 'CustomerSolvencyMonitoring', 
            desc: 'Monitor solvency of customers for financial diligence.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:EnforceSecurity', 
            name: 'EnforceSecurity (general)', 
            desc: 'Ensuring and enforcing security for data, personnel, or other related matters.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:EnforceAccessControl', 
            name: 'EnforceAccessControl', 
            desc: 'Conducting or enforcing access control as a form of security.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:IdentityAuthentication', 
            name: 'IdentityAuthentication', 
            desc: 'Performing authentication based on identity as a form of security.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:MisusePreventionAndDetection', 
            name: 'MisusePreventionAndDetection', 
            desc: 'Prevention and Detection of Misuse or Abuse of services.' 
        },
        { 
            group: 'EnforceSecurity', 
            value: 'dpv:Verification', 
            name: 'Verification', 
            desc: 'Purposes association with verification e.g. information, identity, integrity.' 
        },
        { 
            group: 'EstablishContractualAgreement', 
            value: 'dpv:EstablishContractualAgreement', 
            name: 'EstablishContractualAgreement', 
            desc: 'Carrying out data processing to establish an agreement, such as for entering into a contract.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:FulfilmentOfObligation', 
            name: 'FulfilmentOfObligation (general)', 
            desc: 'Carrying out data processing to fulfill an obligation.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:FulfilmentOfContractualObligation', 
            name: 'FulfilmentOfContractualObligation', 
            desc: 'Carrying out data processing to fulfill a contractual obligation.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:LegalCompliance', 
            name: 'LegalCompliance', 
            desc: 'Carrying out data processing to fulfill a legal or statutory obligation.' 
        },
        { 
            group: 'FulfilmentOfObligation', 
            value: 'dpv:ProtectionOfIPR', 
            name: 'ProtectionOfIPR', 
            desc: 'Purposes associated with the protection of intellectual property rights' 
        },
        { 
            group: 'HumanResourceManagement', 
            value: 'dpv:HumanResourceManagement', 
            name: 'HumanResourceManagement (general)', 
            desc: "Managing humans and 'human resources' within the organisation for effective and efficient operations." 
        },
        { 
            group: 'HumanResourceManagement', 
            value: 'dpv:PersonnelManagement', 
            name: 'PersonnelManagement', 
            desc: 'Mnagement of personnel associated with the organisation e.g. evaluation and management of employees and intermediaries.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:Marketing', 
            name: 'Marketing (general)', 
            desc: 'Purposes associated with conducting marketing in relation to organisation or products or services e.g. promoting, selling, and distributing.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:Advertising', 
            name: 'Advertising', 
            desc: 'Conducting advertising i.e. process or artefact used to call attention to a product, service, etc. through announcements, notices, or other forms of communication.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:DirectMarketing', 
            name: 'DirectMarketing', 
            desc: 'Conducting direct marketing i.e. marketing communicated directly to the individual.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:PublicRelations', 
            name: 'PublicRelations', 
            desc: 'Managing and conducting public relations processes, including creating goodwill for the organisation.' 
        },
        { 
            group: 'Marketing', 
            value: 'dpv:SocialMediaMarketing', 
            name: 'SocialMediaMarketing', 
            desc: 'Conducting marketing through social media.' 
        },
        { 
            group: 'NonCommercialPurpose', 
            value: 'dpv:NonCommercialPurpose', 
            name: 'NonCommercialPurpose (general)', 
            desc: 'Processing activities performed in a non-commercial setting or without intention to commercialise.' 
        },
        { 
            group: 'NonCommercialPurpose', 
            value: 'dpv:NonCommercialResearch', 
            name: 'NonCommercialResearch', 
            desc: 'Conducting research in a non-commercial setting e.g. for a non-profit-organisation (NGO).' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationGovernance', 
            name: 'OrganisationGovernance (general)', 
            desc: 'Conducting activities and functions for governance of an organisation.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:DisputeManagement', 
            name: 'DisputeManagement', 
            desc: 'Activities that manage disputes by natural persons, private bodies, or public authorities relevant to organisation.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:MemberPartnerManagement', 
            name: 'MemberPartnerManagement', 
            desc: 'Maintaining a registry of shareholders, members, or partners for governance, administration, and management functions.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationComplianceManagement', 
            name: 'OrganisationComplianceManagement', 
            desc: 'Managing compliance for organisation in relation to internal policies.' 
        },
        { 
            group: 'OrganisationGovernance', 
            value: 'dpv:OrganisationRiskManagement', 
            name: 'OrganisationRiskManagement', 
            desc: "Managing risk for organisation's activities." 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:Personalisation', 
            name: 'Personalisation (general)', 
            desc: 'Creating and providing customisation based on attributes and/or needs of person(s) or context(s).' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:PersonalisedAdvertising', 
            name: 'PersonalisedAdvertising', 
            desc: 'Creating and providing personalised advertising.' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:PoliticalCampaign', 
            name: 'PoliticalCampaign', 
            desc: 'Political campaign activities related to promotion and advertisement of positions and candidates in elections at local, state or regional, or national and international levels.' 
        },
        { 
            group: 'Personalisation', 
            value: 'dpv:ServicePersonalisation', 
            name: 'ServicePersonalisation', 
            desc: 'Providing personalisation within services or product or activities.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:PublicBenefit', 
            name: 'PublicBenefit (general)', 
            desc: 'Purposes undertaken and intended to provide benefit to public or society' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:CombatClimateChange', 
            name: 'CombatClimateChange', 
            desc: 'Combating the causes and consequences of climate change, including reducing gas emissions and fighting emergencies such as floods or wildfires.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:Counterterrorism', 
            name: 'Counterterrorism', 
            desc: 'Activities that detect, prevent, mitigate, or otherwise perform activities to combat or eliminate terrorism (also referred to as anti-terrorism).' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:DataAltruism', 
            name: 'DataAltruism', 
            desc: 'The voluntary sharing of data for the general interest of the public, such as healthcare or combating climate change.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImproveHealthcare', 
            name: 'ImproveHealthcare', 
            desc: 'Improving healthcare systems such as for personalised treatments and curing chronic diseases.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImprovePublicServices', 
            name: 'ImprovePublicServices', 
            desc: 'Improving the provision of public services, such as public safety, education or law enforcement.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ImproveTransportMobility', 
            name: 'ImproveTransportMobility', 
            desc: 'Improving traffic, public transport systems or costs for drivers.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProtectionOfNationalSecurity', 
            name: 'ProtectionOfNationalSecurity', 
            desc: 'The protection of national security.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProtectionOfPublicSecurity', 
            name: 'ProtectionOfPublicSecurity', 
            desc: 'The protection of public security.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:ProvideOfficialStatistics', 
            name: 'ProvideOfficialStatistics', 
            desc: 'Facilitating the development, production and dissemination of reliable official statistics.' 
        },
        { 
            group: 'PublicBenefit', 
            value: 'dpv:PublicPolicyMaking', 
            name: 'PublicPolicyMaking', 
            desc: 'Public policy making, such as the development of new laws.' 
        },
        { 
            group: 'RecordManagement', 
            value: 'dpv:RecordManagement', 
            name: 'RecordManagement', 
            desc: 'Manage creation, storage, and use of records relevant to operations, events, and processes e.g. to store logs or access requests.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:ResearchAndDevelopment', 
            name: 'ResearchAndDevelopment (general)', 
            desc: 'Conducting research and development for new methods, products, or services.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:AcademicResearch', 
            name: 'AcademicResearch', 
            desc: 'Conducting or assisting with research conducted in an academic context e.g. within universities.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:CommercialResearch', 
            name: 'CommercialResearch', 
            desc: 'Conducting research in a commercial setting or with intention to commercialise e.g. in a company or sponsored by a company.' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:NonCommercialResearch', 
            name: 'NonCommercialResearch', 
            desc: 'Conducting research in a non-commercial setting e.g. for a non-profit-organisation (NGO).' 
        },
        { 
            group: 'ResearchAndDevelopment', 
            value: 'dpv:ScientificResearch', 
            name: 'ScientificResearch', 
            desc: 'Purposes associated with scientific research' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceProvision', 
            name: 'ServiceProvision (general)', 
            desc: 'Providing service or product or activities.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:PaymentManagement', 
            name: 'PaymentManagement', 
            desc: 'Processing and managing payment in relation to service, including invoicing and records.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:RepairImpairments', 
            name: 'RepairImpairments', 
            desc: 'Identifying, rectifying, or otherwise undertaking activities intended to fix or repair impairments to existing functionalities.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:RequestedServiceProvision', 
            name: 'RequestedServiceProvision', 
            desc: 'Delivering services as requested by user or consumer.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:SearchFunctionalities', 
            name: 'SearchFunctionalities', 
            desc: 'Providing searching, querying, or other forms of information retrieval related functionalities.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:SellProducts', 
            name: 'SellProducts', 
            desc: 'Purposes associated with selling products or services.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceOptimisation', 
            name: 'ServiceOptimisation', 
            desc: 'Optimisation of services or activities.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServicePersonalisation', 
            name: 'ServicePersonalisation', 
            desc: 'Providing personalisation within services or product or activities.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceRegistration', 
            name: 'ServiceRegistration', 
            desc: 'Registering users and collecting information required for providing a service' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:ServiceUsageAnalytics', 
            name: 'ServiceUsageAnalytics', 
            desc: 'Conducting analysis and reporting related to usage of services or products.' 
        },
        { 
            group: 'ServiceProvision', 
            value: 'dpv:TechnicalServiceProvision', 
            name: 'TechnicalServiceProvision', 
            desc: 'Managing and providing technical processes and functions necessary for delivering services.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorManagement', 
            name: 'VendorManagement (general)', 
            desc: 'Manage orders, payment, evaluation, and prospecting related to vendors.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorPayment', 
            name: 'VendorPayment', 
            desc: 'Purposes associated with managing payment of vendors.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorRecordsManagement', 
            name: 'VendorRecordsManagement', 
            desc: 'Managing records and orders related to vendors.' 
        },
        { 
            group: 'VendorManagement', 
            value: 'dpv:VendorSelectionAssessment', 
            name: 'VendorSelectionAssessment', 
            desc: 'managing selection, assessment, and evaluation related to vendors' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:HealthcareManagement', 
            name: 'HealthcareManagement (general)', 
            desc: 'Management of healthcare infrastructure and services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:HealthcareServiceManagement', 
            name: 'HealthcareServiceManagement', 
            desc: 'Management of healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:InsuranceManagement', 
            name: 'InsuranceManagement', 
            desc: 'Management of insurance as part of providing healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:Optimisation', 
            name: 'Optimisation', 
            desc: 'Identifying optimisations to use and provision of healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:ResearchDevelopment', 
            name: 'ResearchDevelopment', 
            desc: 'Research and development regarding healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:ResourceManagement', 
            name: 'ResourceManagement', 
            desc: 'Management of resources related to healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:SecurityManagement', 
            name: 'SecurityManagement', 
            desc: 'Management of security in relation to healthcare services.' 
        },
        { 
            group: 'HealthcareManagement', 
            value: 'sector-health:WorkforceManagement', 
            name: 'WorkforceManagement', 
            desc: 'Management of workforce involved in provision of healthcare services.' 
        }
    ]
};

function generatePolicyText(p) {
    if (!p) return "No policy data provided.";
    const con = p.constraints || {};

    //Base
    const perms = p.permissions || {};
    const allowedActions = Object.entries(perms)
        .filter(([_, val]) => val === true)
        .map(([key]) => key.replace('perm', '').toLowerCase());
    const actionsText = allowedActions.length > 0 ? joinList(allowedActions) : "access";

    //Purpose
    const purposes = con.purpose || [];
    let purposeSection = "";
    if (purposes.length > 0) {
        purposeSection = `
            <p>They can only use the data for the following purposes:</p>
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

        if (parseInt(con.DurationYear) > 0) durParts.push(`${con.DurationYear} years`);
        if (parseInt(con.DurationMonth) > 0) durParts.push(`${con.DurationMonth} months`);
        if (parseInt(con.DurationDay) > 0) durParts.push(`${con.DurationDay} days`);
        if (parseInt(con.DurationHour) > 0) durParts.push(`${con.DurationHour} hours`);
    }

    const hasEnd = con.EndTime && con.EndTime !== "";
    const rangeMs = hasEnd ? (new Date(con.EndTime) - new Date(con.StartTime)) : Infinity;

    const startStr = new Date(con.StartTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    if (!isDurationPresent && !hasEnd) {
        timeText = `<p>The access starts on <strong>${startStr}</strong>.</p>`;
    }
    else if (totalDurationMs <= rangeMs) {
        if (totalDurationMs === 0) {
            timeText = `<p>This agreement grants <strong>no access</strong> (duration is 0).</p>`;
        } else {
            timeText = `<p>The agreement grants access for <strong>${joinList(durParts)}</strong> (starting ${startStr}).</p>`;
        }
    }
    else {
        const endStr = new Date(con.EndTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        timeText = `<p>This access is valid from <strong>${startStr}</strong> until <strong>${endStr}</strong>.</p>`;
    }

    //Restrictions
    let extraRestrictions = "";
    if (con.Usage && con.Usage !== "0") {
        extraRestrictions += `<p>Usage is limited to a maximum of <strong>${con.Usage}</strong> uses.</p>`;
    }
    if (con.Location) {
        extraRestrictions += `<p>Access is restricted to the location: <strong>${con.Location}</strong>.</p>`;
    }

    //Duties
    const dutyMap = {
        delete: "delete all data when access is revoked",
        anonymize: "ensure the data is anonymized",
        encrypt: "keep the data encrypted",
        notify: "notify you whenever the data is accessed"
    };

    const activeDutyTexts = Object.entries(p.duties || {})
        .filter(([_, val]) => val === true)
        .map(([key]) => dutyMap[key]);
    
    let dutySection = "";
    if (activeDutyTexts.length > 0) {
        dutySection = `<p>Regarding duties, they are required to <strong>${joinList(activeDutyTexts)}</strong>.</p>`;
    }

    //Assembly
    return `
      <div class="policy-summary">
        <p>This policy (ID: <strong>${p.id}</strong>) entails access to <strong>${p.dataUri || 'the data'}</strong> for the consumer <strong>${p.consumer || 'the consumer'}</strong>.</p>
        <p>They are allowed to <strong>${actionsText}</strong> the data, which is provided by <strong>${p.provider || 'the provider'}</strong>.</p>
        
        ${purposeSection}
        ${timeText}
        ${extraRestrictions}
        ${dutySection}
      </div>
    `;
}

tiers = { 0: { label: "No Policies", color: "grey" }, 1: { label: "Can View", color: "green" }, 2: { label: "Can Add", color: "yellow" }, 3: { label: "Can Edit", color: "orange" }, 4: { label: "Full Control", color: "red" } };

function permBadges(perms) {
    return `
        <div class="badge-list">
            ${perms.Read   ? `<span class="badge green">Read</span>`   : '' }
            ${perms.Add    ? `<span class="badge yellow">Add</span>`   : '' }
            ${perms.Edit   ? `<span class="badge orange">Edit</span>`  : '' }
            ${perms.Manage ? `<span class="badge red">Manage</span>`   : '' }
        </div>
    `;
}