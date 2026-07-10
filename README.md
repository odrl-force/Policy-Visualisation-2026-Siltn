# Master Thesis: Policy Visualisation User Study

This repository contains the evaluation framework and frontend interfaces used for the user study in my Master's thesis. The project implements, visualizes, and evaluates four distinct privacy and policy UX models derived from academic literature, industry web tools, and real-world e-commerce designs.

To ensure ease of deployment and platform-independent testing, the entire application is built using vanilla HTML, CSS, and JavaScript.


## Methodology & Unified Data Layout

To ensure a fair benchmarking environment during the user study, the data dimensions and information layout were completely **unified across all four models**. 

The selection of these specific dimensions was driven by the empirical feedback from an initial **user priority survey**, where participants provided their opinions on what policy information mattered most to them. 


## The 4 Visualized Models

The user study evaluates and benchmarks how users interact with, interpret, and navigate four distinct policy presentation layouts:

### 1. Extending PriPoCoG (Modular Creation UI)
* **Source:** Inspired by the academic paper *[Extending PriPoCoG: A Privacy Policy Editor for GDPR-Compliant Privacy Policies](https://www.scitepress.org/Papers/2024/125996/125996.pdf)* (Leicht & Heisel).
* **Layout:** A **modular, step-by-step creation wizard** that breaks down complex policy attributes into bite-sized, sequential compliance components.

### 2. ODRL-PAP Form (Monolithic Layout)
* **Source:** Modeled after the *[ODRL Policy Administration Point (PAP)](https://odrl-pap.mydata-control.de/)* web editor (`ComplexPolicyForm`) developed by Fraunhofer IESE for the W3C ODRL data sovereignty standard.
* **Layout:** A **monolithic, comprehensive policy form** that captures detailed access control permissions, prohibitions, and obligations inside a single, high-density page layout.

### 3. AppAware & PrivacyBird Hybrid (Hierarchical Table UI)
* **Source:** Derived from *[AppAware: A Policy Visualization Model for Mobile Applications](https://www.sciencedirect.com/org/science/article/abs/pii/S2056496119000254)* (Paspatis & Tsohou), augmented with design concepts from **[PrivacyBird](https://dl.acm.org/doi/10.1145/1165734.1165735)** (Cranor et al.).
* **Layout:** A structured **hierarchical data table**. Because the original AppAware model lacked the information depth required for this study, design paradigms from PrivacyBird were adapted into it to expand its data capacity while maintaining a clear, nested breakdown of permission levels and privacy risks.

### 4. Webstore-Based Model (Faceted Filter UI)
* **Source:** Industry baseline modeled after major commercial e-commerce platforms.
* **Layout:** A **faceted filter interface** letting users query and narrow down extensive privacy rules using multi-selectable category filters (e.g., purpose, data type, retention period), mirroring common online shopping experiences.

---

## Installation & Running Locally

### 1. Clone the repository:
   ```
   git clone https://github.com/siltn/MasterThesisPolicyVisualisation.git
   cd MasterThesisPolicyVisualisation
   ```

### 2. Host the webpage:
   
   1. Open the folder in VS Code and run it using the **Live Server** extension:
      * **Name:** Live Server
      * **ID:** `ritwickdey.LiveServer`
      * **Marketplace Link:** [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


   2.   Alternateveley http-server can be used
   
      ```
      npm install http-server
      npx http-server
      ```


### 3. Interface Configuration (LocalStorage):
   The application determines which interface to display based on your browser's `localStorage` variables. You can modify these values in your browser's developer console (F12):
   * `lang`: Choose language (`en` or `nl`)
   * `group`: Choose test group (`1` or `2`)
   * `question`: Set question index (value from `0` to `12`)

   #### console scripts:

      f12 -> console
      ```javascript
      localStorage.setItem('lang', 'en');      // 'en' | 'nl'
      localStorage.setItem('group', '1');     // '1' | '2'
      localStorage.setItem('question', '0');  // 0 through 11
      ```

   #### Url params:
   
   index.html
   ```
   ?group=1&question=0&lang=en
   ```


### 4. SolidPod Setup

Posting to the pod is currently disabled. To test this feature, you need to update [final.js](assets/js/final.js) with two changes:

1. **Insert your pod path:** Add a path to a pod you control that has public post access.
2. **Enable posting:** Find the `DontPost` setting and change its value to `true`.