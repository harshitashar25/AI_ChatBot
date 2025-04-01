# AI_ChatBot
# Emotivox 2.0

## Introduction
Emotivox 2.0 is a web-based AI-powered chatbot that interacts with users using text-based input. The chatbot leverages Google's Gemini 1.5 Pro API to provide intelligent responses. Users can also upload images/screenshots as part of their queries to enhance the chatbot's understanding.

## Features
- AI-powered chatbot using Gemini 1.5 Pro API
- Text-based interaction with intelligent responses
- Image upload support for enhanced queries
- Auto-scrolling chat interface
- Real-time response rendering with a typing indicator

## Project Structure
```
frontend
│── node_modules/          # Dependencies
│── public/                # Static files
│── src/
│   │── assets/            # Contains additional assets
│   │── aiService.js       # API calls to Gemini AI
│   │── App.css            # Styling for the application
│   │── App.jsx            # Main Chatbot component
│   │── index.css          # Global styles
│   │── main.jsx           # Entry point for React
│── .gitignore             # Ignored files for Git
│── eslint.config.js       # Linter configuration
│── index.html             # HTML entry file
│── package-lock.json      # Package versions
│── package.json           # Project dependencies & scripts
│── README.md              # Project documentation
│── vite.config.js         # Vite configuration file
```

## Getting Started

### Prerequisites
- Node.js installed (Recommended: v16+)
- npm or yarn installed
- A Gemini API key

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/harshitashar25/Emotivox2.0.git
   cd Emotivox2.0/frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your API Key:
   - Open `src/aiService.js`
   - Replace `{Your API Key}` with your actual Gemini API key

### Running the Project
Start the development server:
```sh
npm run dev
```
This will start the application, and you can access it at `http://localhost:5173/`

## Usage
1. Type a message in the input field to interact with the chatbot.
2. Click on the 📷 button to upload an image or screenshot.
3. Press enter or the send button (→) to get a response.
4. The AI response will appear in the chat interface.

## Deployment
To build the project for production:
```sh
npm run build
```
This will generate a `dist/` folder with optimized assets.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature-branch`)
5. Open a pull request

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

