# Sai Praveen Portfolio

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## 📝 Editing Content

All website content is stored in `src/data/siteData.json`. You can edit this file to update your portfolio without changing the code.

### Managing Projects
To add or remove projects, locate the `projects` object in `siteData.json`.
- Add new entries to the `keyProjects` array.
- Available categories: `"iot"`, `"fullstack"`, `"web"`.
- Set `"highlighted": true` to add a featured badge.

### Managing Certificates
To update certificates, locate the `certificates` object in `siteData.json`.
- Add entries to `firstPrize`, `secondPrize`, `thirdPrize`, or `professional` arrays.
- **Images:** Place your certificate images in the `public/images/certificates/` folder.
- Update the `image` path in the JSON to match your filename (e.g., `/images/certificates/my-cert.jpg`).
- If an image is missing, the site will automatically show a fallback placeholder.

### Updating Contact Info
Update the `contact` object in `siteData.json` with your latest email, phone, or location.

## 🎨 Customization

- **Colors:** Primary colors can be customized in `tailwind.config.js`.
- **Animations:** Animations use Framer Motion and are defined in individual components.
