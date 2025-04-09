# AICHATBOT

**CHATBOT** is a web-based AI-powered chatbot that interacts with users through text and image inputs. The chatbot uses **Google's Gemini 1.5 Pro API** to provide intelligent responses and can process screenshots or images to better understand user queries.

---

## ✨ Features

- 💬 AI-powered chatbot using Gemini 1.5 Pro API  
- 🖼️ Image upload support for enhanced query understanding  
- ⚡ Real-time response rendering with typing indicator  
- 🔄 Auto-scrolling chat interface  
- 🛠️ Built with React + Vite  

---

## 📁 Project Structure

frontend │── public/ # Static files │── src/ │ ├── assets/ # Image and media assets │ ├── aiService.js # Gemini API interaction logic │ ├── App.css # Main styling │ ├── App.jsx # Main Chatbot UI │ ├── index.css # Global styles │ └── main.jsx # React entry point │── .gitignore │── eslint.config.js │── index.html │── package-lock.json │── package.json │── README.md │── vite.config.js


---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  
- A valid Gemini API key  

### 🛠️ Installation

```bash
git clone https://github.com/harshitashar25/Emotivox2.0.git
cd Emotivox2.0/frontend
npm install

🔐 Configure API Key
Edit src/aiService.js and replace:
const API_KEY = "{Your API Key}";
with your actual Gemini API key.

🧪 Running the App
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

🧠 Usage
Type your query into the input field.

Optionally, upload an image/screenshot.

Hit Enter or click the ➡️ send button.

Wait for Emotivox's smart response.

🚢 Deployment
bash
Copy
Edit
npm run build
Builds your app to the dist/ folder for production deployment.

🤝 Contributing
Fork the repository

Create your branch: git checkout -b feature-name

Commit changes: git commit -m "Add feature"

Push to your branch: git push origin feature-name

Submit a Pull Request

📄 License
This project is licensed under the MIT License.

🧠 Built With
React

Vite

Google Gemini API

yaml
Copy
Edit

---

Once you replace your `README.md` with this content, just run the following to resolve and commit:

```bash
git add README.md
git commit -m "Resolved README.md conflict and updated project details"
git push -u origin main
