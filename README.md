# TOPSIS React

## Overview

The Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS) is a multi-criteria decision analysis method. This project is a web application that implements the TOPSIS algorithm, allowing users to analyze and rank alternatives based on multiple criteria.

## Features

- Implements the **TOPSIS** (Technique for Order of Preference by Similarity to Ideal Solution) algorithm for multi-criteria decision analysis.
- Supports data import from **spreadsheets** (e.g., .xlsx).
- Allows for **manual data entry** and modification of alternatives.
- Enables users to define and **assign weights** to various criteria.
- Differentiates between **benefit criteria** (where higher values are better) and **cost criteria** (where lower values are better).
- Calculates and displays a **ranked list of alternatives** based on the TOPSIS analysis.
- Provides a user interface with **internationalization support** (e.g., English, Portuguese).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and Yarn installed on your system.
- Node.js: [https://nodejs.org/](https://nodejs.org/)
- Yarn: [https://yarnpkg.com/](https://yarnpkg.com/)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/pedrohenriquebr/topsis-react.git
   ```
2. Navigate to the project directory:
   ```sh
   cd topsis-react
   ```
3. Install Yarn packages:
   ```sh
   yarn install
   ```

### Running the Application

To run the app in development mode:
```sh
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

## Guide with Example

### Prepare the Dataset on Spreadsheet

Create your spreadsheet with the necessary data.

Add a column named "Name" for the alternatives.

![image](https://user-images.githubusercontent.com/25212918/112929400-bba98f80-90ee-11eb-9bce-e5129cdad5b3.png)

> If your language is Portuguese, this column will be "Nome".

### Set the Weights

Set the weight for each criterion according to your preferences.

![image](https://user-images.githubusercontent.com/25212918/112931556-c534f680-90f2-11eb-8446-a38790bae94d.png)

> The sum of the weights must be equal to 100.

### Loading the Dataset

Click the "Load" button and select your spreadsheet.

You can also add a row manually.

![image](https://user-images.githubusercontent.com/25212918/112932188-de8a7280-90f3-11eb-91dd-ac96e4e0c479.png)

### See Results

Finally, view the results: the top ranking with the best alternatives.

![image](https://user-images.githubusercontent.com/25212918/112932782-ed255980-90f4-11eb-9c85-482ecde52cc7.png)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

*Note: It is recommended to add a `LICENSE` file to the root of your repository. You can create one with the MIT License text, which can be found at [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).*
