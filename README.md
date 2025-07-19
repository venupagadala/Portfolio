# 🌟 Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-%23000000.svg?style=for-the-badge&logo=firefoxbrowser&logoColor=white)](https://venupagadala.github.io/Portfolio/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/venupagadala/Portfolio)


Welcome to my professional portfolio website! This responsive web application showcases my skills, projects, and professional journey as a Frontend Developer.

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Project Showcase**: Interactive display of my work with detailed case studies
- **Contact Form**: Integrated backend service for message handling
- **Performance Optimized**: Fast loading times and smooth interactions
- **SEO Friendly**: Properly structured for search engine visibility

## 📁 Project Structure

```
Portfolio/
├── public/                  # Static assets and HTML template
├── src/                     # Main application source
│   ├── assets/              # Images, fonts, and global styles
│   ├── components/          # Reusable React components
│   ├── pages/               # Page-level components
│   ├── data/                # Project data and constants
│   └── App.js               # Main application component
├── .github/                 # GitHub configuration
│   └── workflows/           # CI/CD workflows
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

### Backend (Contact Form)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

### Deployment
![GitHub Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/venupagadala/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your email service credentials:
     ```
     EMAIL_SERVICE=your_email_service
     EMAIL_USERNAME=your_email
     EMAIL_PASSWORD=your_password
     EMAIL_TO=recipient_email
     ```

4. **Run the development server**
   ```bash
   npm start
   ```

## 📦 Deployment

The frontend is deployed on GitHub Pages, while the backend contact form service is hosted separately (currently on Vercel).

To deploy:
```bash
npm run deploy
```

## 📬 Contact Form Backend

The contact form uses a Node.js/Express backend with Nodemailer to handle message delivery. The service:
- Validates form inputs
- Protects against spam
- Sends emails with proper formatting
- Provides success/error feedback



## 🙏 Acknowledgments

- Inspired by modern developer portfolios
- Special thanks to open source contributors
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
```

Key improvements:
1. Added the folder structure section right after features
2. Used clear ASCII tree diagram with brief descriptions
3. Maintained consistent styling with the rest of the document
4. Kept all the existing sections intact
5. The structure highlights the organized nature of your project

The folder structure section helps potential contributors or employers quickly understand your project organization, which is especially valuable for a portfolio that demonstrates your coding standards and architecture skills.
