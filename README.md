# Master Thesis: Policy Visualisation User Study

This repository contains the evaluation framework and frontend interfaces used for the user study in my Master's thesis. The project implements, visualizes, and evaluates four distinct privacy and policy UX models derived from academic literature, industry web tools, and real-world e-commerce designs.

To ensure ease of deployment and platform-independent testing, the entire application is built using vanilla HTML, CSS, and JavaScript.


## Methodology & Unified Data Layout

To ensure a fair benchmarking environment during the user study, the data dimensions and information layout were completely **unified across all four models**. 

The selection of these specific dimensions was driven by the empirical feedback from an initial **user priority survey**, where participants provided their opinions on what policy information mattered most to them. 


## The 4 Visualized Models

The user study evaluates and benchmarks how users interact with, interpret, and navigate four distinct policy presentation layouts:

### 1. Extending PriPoCoG (Modular Creation UI)
* **Source:** Inspired by the academic paper *Extending PriPoCoG: A Privacy Policy Editor for GDPR-Compliant Privacy Policies* (Leicht & Heisel).
* **Layout:** A **modular, step-by-step creation wizard** that breaks down complex policy attributes into bite-sized, sequential compliance components.

### 2. ODRL-PAP Form (Monolithic Layout)
* **Source:** Modeled after the *ODRL Policy Administration Point (PAP)* web editor (`ComplexPolicyForm`) developed by Fraunhofer IESE for the W3C ODRL data sovereignty standard.
* **Layout:** A **monolithic, comprehensive policy form** that captures detailed access control permissions, prohibitions, and obligations inside a single, high-density page layout.

### 3. AppAware & PrivacyBird Hybrid (Hierarchical Table UI)
* **Source:** Derived from *AppAware: A Policy Visualization Model for Mobile Applications* (Paspatis & Tsohou), augmented with design concepts from **PrivacyBird** (Cranor et al.).
* **Layout:** A structured **hierarchical data table**. Because the original AppAware model lacked the information depth required for this study, design paradigms from PrivacyBird were adapted into it to expand its data capacity while maintaining a clear, nested breakdown of permission levels and privacy risks.

### 4. Webstore-Based Model (Faceted Filter UI)
* **Source:** Industry baseline modeled after major commercial e-commerce platforms.
* **Layout:** A **faceted filter interface** letting users query and narrow down extensive privacy rules using multi-selectable category filters (e.g., purpose, data type, retention period), mirroring common online shopping experiences.

---

## Installation & Running Locally

Because this project relies strictly on vanilla web technologies, you do not need to install complex backend dependencies. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siltn/MasterThesisPolicyVisualisation.git
   cd MasterThesisPolicyVisualisation