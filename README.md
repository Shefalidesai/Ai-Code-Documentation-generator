Here’s a basic `README.md` for your Code Snippet Creator project:

---

# Code Snippet Creator with CopilotKit

This is a web-based code snippet generator that leverages **CopilotKit** to help developers generate, save, and view code snippets based on prompts entered into the CopilotChat interface. The app allows users to interact with an AI assistant to generate code and save those snippets for future reference.

## Features

- **CopilotChat integration**: Ask for code snippets, and get responses generated by CopilotKit.
- **Dark mode support**: Toggle between light and dark modes.
- **Manual snippet saving**: Once the AI assistant generates code, users can manually save it for later.
- **Code snippet viewer**: View all saved code snippets in a neat, formatted layout.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (or Yarn)
- A valid **CopilotKit** API key

## Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Shefalidesai/Ai-Code-Documentation-generator.git
    cd code-snippet-creator
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Add CopilotKit API Key**:

   Create a `.env` file in the root of the project and add your public CopilotKit API key:

    ```bash
    NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=your-api-key-here
    ```

4. **Run the development server**:

    ```bash
    npm run dev
    ```

5. Open your browser and visit:

    ```
    http://localhost:3000
    ```

## How It Works

- **Generate Code Snippets**: Ask for code snippets using CopilotChat. Once the AI generates code, you can manually copy the code into the provided `textarea` and click the "Save Snippet" button to store the snippet.
- **View Saved Snippets**: All saved snippets are displayed in a neatly formatted section at the bottom of the page.

## Components

- **`CopilotKit`**: Provides the main AI API functionality using CopilotKit's public API key.
- **`CopilotChat`**: A chat interface where users can ask for code snippets.
- **`CodeSnippet`**: A component that renders the saved code snippets.
- **`textarea`**: A manual input field where users can copy the code generated by the chat for storage.

## Dark Mode

The app comes with a built-in dark mode that is automatically applied based on the user's system preference or manual toggle. The theme preference is stored in `localStorage` for persistence.

## Future Improvements

- **Auto-save snippet**: Instead of manually copying the response into the `textarea`, automate the process by capturing the response directly from the chat and saving it as a snippet.
- **Code snippet management**: Add functionality to edit, delete, or categorize saved snippets.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. If you find a bug or have a feature request, please open an issue first.

## License

This project is licensed under the MIT License.

---

## Example Screenshot

[![screenshot]](https://github.com/Shefalidesai/Ai-Code-Documentation-generator/blob/main/Screenshot-1.jpeg)
---

Feel free to replace the screenshot placeholder link with an actual screenshot of your project in action.
