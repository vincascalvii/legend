/* ==========================================================================

    AFFINITY JS

    This script handles the functionality for a web page that displays type 
    and attribute effectiveness. It includes tabs for Types and Attributes, 
    and allows users to select types or attributes to see their strengths, 
    weaknesses, and immunities.

========================================================================== */

// Set up the data for types
const typesData = {
    "Beast": { strengths: ["Insect"], weaknesses: ["Construct", "Mythic"] },
    "Insect": { strengths: ["Plant"], weaknesses: ["Beast", "Avian"] },
    "Avian": { strengths: ["Insect", "Plant"], weaknesses: ["Construct", "Mythic"] },
    "Aquatic": { strengths: ["Beast", "Avian"], weaknesses: ["Plant", "Mythic"] },
    "Plant": { strengths: ["Aquatic", "Construct"], weaknesses: ["Insect", "Avian", "Mythic"] },
    "Construct": { strengths: ["Beast", "Mythic"], weaknesses: ["Aquatic", "Plant"] },
    "Mythic": { strengths: ["Mythic"], weaknesses: ["Construct"] }
};

// Set up the data for attributes
const attributesData = {
    "Nature": { strengths: ["Water", "Earth"], weaknesses: ["Fire", "Wind", "Metal", "Toxic"], immune: [] },
    "Fire": { strengths: ["Nature", "Metal", "Ice", "Dark"], weaknesses: ["Fire", "Water", "Earth", "Light"], immune: [] },
    "Water": { strengths: ["Fire", "Electric", "Earth"], weaknesses: ["Nature", "Water", "Toxic"], immune: [] },
    "Electric": { strengths: ["Water", "Wind", "Metal"], weaknesses: ["Nature", "Electric"], immune: ["Earth"] },
    "Wind": { strengths: ["Fire", "Toxic"], weaknesses: ["Electric", "Metal"], immune: [] },
    "Earth": { strengths: ["Fire", "Electric", "Metal", "Toxic"], weaknesses: ["Nature", "Water"], immune: ["Wind"] },
    "Metal": { strengths: ["Ice", "Light"], weaknesses: ["Fire", "Electric", "Metal"], immune: [] },
    "Ice": { strengths: ["Nature", "Wind", "Earth"], weaknesses: ["Metal", "Ice"], immune: [] },
    "Toxic": { strengths: ["Nature", "Water"], weaknesses: ["Earth", "Toxic"], immune: ["Metal"] },
    "Dark": { strengths: ["Light", "Neutral"], weaknesses: ["Dark"], immune: [] },
    "Light": { strengths: ["Toxic", "Dark"], weaknesses: ["Ice", "Light"], immune: ["Nature"] },
    "Neutral": { strengths: [], weaknesses: ["Metal", "Dark"], immune: [] }
};

// Initialise the page by setting up event listeners for tabs and populating data
document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    setupTypesTab();
    setupAttributesTab();
});

// Functions to handle tab functionality and data display
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.textContent.toLowerCase();
            openTab(tabName);
        });
    });
}

// Function to open a specific tab and display its content
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Remove active class from all tabs and buttons
    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(button => button.classList.remove('active'));

    // Add active class to the selected tab and button
    document.getElementById(tabName + '-tab').classList.add('active');
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Function to set up the Types tab, populate the table and select field, and handle type selection
function setupTypesTab() {
    const typeSelect = document.getElementById('type-select');
    const typesChartBody = document.getElementById('types-chart-body');

    // Populate table
    for (const type in typesData) {
        const row = typesChartBody.insertRow();
        const strengths = typesData[type].strengths.length > 0 ? typesData[type].strengths.join(", ") : "None";
        const weaknesses = typesData[type].weaknesses.length > 0 ? typesData[type].weaknesses.join(", ") : "None";
        row.insertCell(0).textContent = type;
        row.insertCell(1).textContent = strengths;
        row.insertCell(2).textContent = weaknesses;
    }

    // Populate select field
    const defaultOption = document.createElement('option');
    defaultOption.textContent = "Select a Type";
    defaultOption.value = "";
    typeSelect.appendChild(defaultOption);
    for (const type in typesData) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    }

    // Add event listener for type selection
    typeSelect.addEventListener('change', displayTypeEffectiveness);
}

// Function to display the effectiveness of the selected type
function displayTypeEffectiveness() {
    const selectedType = document.getElementById('type-select').value;
    const resultDiv = document.getElementById('type-result');
    resultDiv.innerHTML = '<h3>Effectiveness</h3>';

    // Check if a type is selected
    if (!selectedType) {
        resultDiv.innerHTML = '<h3>Effectiveness</h3><p>Select a type to see what is strong or weak against it.</p>';
        return;
    }

    // Find strengths and weaknesses against the selected type
    const takes2xDamageFrom = [];
    const takes05xDamageFrom = [];

    // Loop through all types to find strengths and weaknesses
    for (const type in typesData) {
        if (typesData[type].strengths.includes(selectedType)) {
            takes2xDamageFrom.push(type);
        }
        if (typesData[type].weaknesses.includes(selectedType)) {
            takes05xDamageFrom.push(type);
        }
    }
    
    // Format the results into lists
    const strengthsList = takes05xDamageFrom.length > 0 ? takes05xDamageFrom.map(t => `<li>${t}</li>`).join('') : '<li>None</li>';
    const weaknessesList = takes2xDamageFrom.length > 0 ? takes2xDamageFrom.map(t => `<li>${t}</li>`).join('') : '<li>None</li>';

    // Update the result div with the effectiveness information
    resultDiv.innerHTML = `
        <h3>How ${selectedType} is Affected</h3>
        <p><strong>Takes 2x Damage From:</strong></p>
        <ul>${weaknessesList}</ul>
        <p><strong>Takes 0.5x Damage From:</strong></p>
        <ul>${strengthsList}</ul>
    `;
}

// Function to set up the Attributes tab, populate the table and select fields, and handle attribute selection
function setupAttributesTab() {
    const attributeSelect1 = document.getElementById('attribute1-select');
    const attributeSelect2 = document.getElementById('attribute2-select');
    const attributesChartBody = document.getElementById('attributes-chart-body');

    // Populate table
    for (const attribute in attributesData) {
        const row = attributesChartBody.insertRow();
        const strengths = attributesData[attribute].strengths.length > 0 ? attributesData[attribute].strengths.join(", ") : "None";
        const weaknesses = attributesData[attribute].weaknesses.length > 0 ? attributesData[attribute].weaknesses.join(", ") : "None";
        const immune = attributesData[attribute].immune.length > 0 ? attributesData[attribute].immune.join(", ") : "None";
        row.insertCell(0).textContent = attribute;
        row.insertCell(1).textContent = strengths;
        row.insertCell(2).textContent = weaknesses;
        row.insertCell(3).textContent = immune;
    }

    // Populate select fields
    const defaultOption1 = document.createElement('option');
    defaultOption1.textContent = "Select Attribute 1";
    defaultOption1.value = "";
    attributeSelect1.appendChild(defaultOption1);
    const defaultOption2 = document.createElement('option');
    defaultOption2.textContent = "Select Attribute 2";
    defaultOption2.value = "";
    attributeSelect2.appendChild(defaultOption2);

    // Add options for each attribute
    for (const attribute in attributesData) {
        const option1 = document.createElement('option');
        option1.value = attribute;
        option1.textContent = attribute;
        attributeSelect1.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = attribute;
        option2.textContent = attribute;
        attributeSelect2.appendChild(option2);
    }

    // Add event listeners for attribute selection
    attributeSelect1.addEventListener('change', displayAttributeEffectiveness);
    attributeSelect2.addEventListener('change', displayAttributeEffectiveness);
}

// Function to display the effectiveness of the selected attributes
function displayAttributeEffectiveness() {
    const attribute1 = document.getElementById('attribute1-select').value;
    const attribute2 = document.getElementById('attribute2-select').value;
    const resultDiv = document.getElementById('attribute-result');
    resultDiv.innerHTML = '<h3>Combined Effectiveness</h3>';

    // Check if at least one attribute is selected
    if (!attribute1 && !attribute2) {
        resultDiv.innerHTML = '<h3>Combined Effectiveness</h3><p>Select one or two attributes to see their combined strengths and weaknesses.</p>';
        return;
    }

    // Calculate effectiveness based on selected attributes
    const effectiveness = {
        "4x": [], "2x": [], "0.5x": [], "0.25x": [], "0x": []
    };

    // Get all attributes to check against
    const allAttributes = Object.keys(attributesData);

    // Loop through all attributes to determine their effectiveness against the selected attributes
    for (const attribute of allAttributes) {
        if (attribute === attribute1 || attribute === attribute2) {
            continue;
        }

        // Initialise damage multiplier
        let damageMultiplier = 1.0;
        
        // Check against attribute 1
        if (attribute1) {
            if (attributesData[attribute].strengths.includes(attribute1)) damageMultiplier *= 2.0;
            if (attributesData[attribute].weaknesses.includes(attribute1)) damageMultiplier *= 0.5;
            if (attributesData[attribute].immune.includes(attribute1)) damageMultiplier *= 0.0;
        }
        
        // Check against attribute 2
        if (attribute2) {
            if (attributesData[attribute].strengths.includes(attribute2)) damageMultiplier *= 2.0;
            if (attributesData[attribute].weaknesses.includes(attribute2)) damageMultiplier *= 0.5;
            if (attributesData[attribute].immune.includes(attribute2)) damageMultiplier *= 0.0;
        }

        // Assign to the correct category
        if (damageMultiplier === 4.0) effectiveness["4x"].push(attribute);
        else if (damageMultiplier === 2.0) effectiveness["2x"].push(attribute);
        else if (damageMultiplier === 0.5) effectiveness["0.5x"].push(attribute);
        else if (damageMultiplier === 0.25) effectiveness["0.25x"].push(attribute);
        else if (damageMultiplier === 0.0) effectiveness["0x"].push(attribute);
    }
    
    // Format the results into lists
    let title = "Combined Effectiveness";
    if (attribute1 && attribute2) {
        title = `${attribute1} & ${attribute2} Effectiveness`;
    } else if (attribute1) {
        title = `${attribute1} Effectiveness`;
    } else if (attribute2) {
        title = `${attribute2} Effectiveness`;
    }

    // Update the result div with the effectiveness information
    resultDiv.innerHTML = `
        <h3>How ${title} is Affected</h3>
        <p><strong>Takes 4x Damage From:</strong></p>
        <ul>${effectiveness["4x"].length > 0 ? effectiveness["4x"].map(t => `<li>${t}</li>`).join('') : '<li>None</li>'}</ul>
        <p><strong>Takes 2x Damage From:</strong></p>
        <ul>${effectiveness["2x"].length > 0 ? effectiveness["2x"].map(t => `<li>${t}</li>`).join('') : '<li>None</li>'}</ul>
        <p><strong>Takes 0.5x Damage From:</strong></p>
        <ul>${effectiveness["0.5x"].length > 0 ? effectiveness["0.5x"].map(t => `<li>${t}</li>`).join('') : '<li>None</li>'}</ul>
        <p><strong>Takes 0.25x Damage From:</strong></p>
        <ul>${effectiveness["0.25x"].length > 0 ? effectiveness["0.25x"].map(t => `<li>${t}</li>`).join('') : '<li>None</li>'}</ul>
        <p><strong>Takes 0x Damage From:</strong></p>
        <ul>${effectiveness["0x"].length > 0 ? effectiveness["0x"].map(t => `<li>${t}</li>`).join('') : '<li>None</li>'}</ul>
    `;
}
