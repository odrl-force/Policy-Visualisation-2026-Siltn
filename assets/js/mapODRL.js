document.getElementById("generate").addEventListener("click", (e) => {
    let odrlsection = document.getElementById("odrl");
    let content = document.getElementById("simpleformat").value;

    odrlsection.innerHTML = JSON.stringify(transformToODRL(JSON.parse(content)), null, 2);
});

function transformToODRL(input) {
    const actionMap = {
        permRead: "read",
        permAdd: "add",
        permModify: "modify",
        permManage: "grant"
    };

    const allowedActions = Object.keys(input.permissions)
        .filter(key => input.permissions[key] === true)
        .map(key => actionMap[key]);

    const constraints = [];
    if (input.constraints.purpose && !input.constraints.purpose.includes("all:all")) {
        constraints.push({
            leftOperand: "dpv-odrl:Purpose",
            operator: "isAnyOf",
            rightOperand: input.constraints.purpose
        });
    }

    if (input.constraints.StartTime) {
        constraints.push({
            leftOperand: "dateTime",
            operator: "gteq",
            rightOperand: `${input.constraints.StartTime}:00Z`
        });
    }
    
    if (input.constraints.EndTime) {
        constraints.push({
            leftOperand: "dateTime",
            operator: "lteq",
            rightOperand: `${input.constraints.EndTime}:00Z`
        });
    }

    const duration = `P${input.constraints.DurationYear || 0}Y${input.constraints.DurationMonth || 0}M${input.constraints.DurationDay || 0}DT${input.constraints.DurationHour || 0}H`;
    if (duration !== "P0Y0M0DT0H") {
        constraints.push({
            leftOperand: "elapsedTime",
            operator: "eq",
            rightOperand: duration
        });
    }

    if (input.constraints.Location) {
        constraints.push({
            leftOperand: "spatial",
            operator: "eq",
            rightOperand: input.constraints.Location
        });
    }

    if (input.constraints.Usage) {
        constraints.push({
            leftOperand: "count",
            operator: "lteq",
            rightOperand: input.constraints.Usage
        });
    }

    const dutyMap = {
        delete: "odrl:delete",
        anonymize: "odrl:anonymize",
        encrypt: "odrl:encrypt",
        notify: "odrl:inform"
    };

    const duties = Object.keys(input.duties)
        .filter(key => input.duties[key] === true)
        .map(key => ({ action: dutyMap[key] }));

    return {
        "@context": [
            "http://www.w3.org/ns/odrl.jsonld",
            {
                "dpv": "https://w3id.org/dpv#",
                "dpv-odrl": "https://w3id.org/dpv/mappings/odrl#",
                "sector-health": "https://w3id.org/dpv/sector/health#"
            }
        ],
        "@type": input.policyType || "Offer",
        "uid": `https://solidweb.me/randomid-4423849028409238490`,
        "permission": [{
            "target": input.dataUri,
            "assigner": input.provider,
            "assignee": input.consumer,
            "action": allowedActions,
            "constraint": constraints.length > 0 ? constraints : undefined,
            "duty": duties.length > 0 ? duties : undefined
        }],
        "profile": "https://w3id.org/dpv/mappings/odrl#",
        "rdfs:label": input.name,
        "description": input.description
    };
}