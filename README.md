# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML5 and CSS3. This website showcases your professional profile, projects, and skills with a clean, professional design.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Styling**: Professional gradient backgrounds and smooth animations
- **Navigation**: Sticky header with smooth scroll navigation
- **Hero Section**: Eye-catching introduction with call-to-action button
- **About Me Section**: Brief bio and professional summary
- **Projects Showcase**: Display of 3 featured projects with descriptions and technology stack
- **Skills Section**: Organized skills by category (Frontend, Backend, Database, Data & Analytics)
- **Social Links**: Links to GitHub, LinkedIn, Twitter, and email
- **Accessibility**: Semantic HTML and accessible navigation

## File Structure

```
Portfolio Moringa Lab/
├── index.html          # Main HTML file with embedded CSS
├── README.md           # This file
└── assets/             # Optional: for images and additional resources
```

## How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser
2. **Customize your information**:
   - Replace `"Your Name"` with your actual name throughout the file
   - Update the title (change `"Full Stack Developer"` to your job title)
   - Modify the bio and about section with your information
   - Add your actual GitHub, LinkedIn, Twitter, and email links

3. **Update Projects**:
   - Edit the three project cards with your actual projects
   - Change project names, descriptions, and technology tags
   - Update GitHub links to point to your repositories

4. **Customize Skills**:
   - Modify skill tags under each category
   - Add or remove skill categories as needed
   - Adjust skill names to match your expertise

## Customization Guide

### Color Scheme
Change the color variables at the top of the CSS section:
```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #1e293b;    /* Dark text color */
    --text-color: #334155;         /* Regular text */
    --light-bg: #f8fafc;           /* Light background */
    --border-color: #e2e8f0;       /* Border color */
    --white: #ffffff;              /* White */
}
```

### Navigation Links
Update navigation items in the header:
```html
<li><a href="#about">About</a></li>
<li><a href="#projects">Projects</a></li>
<li><a href="#skills">Skills</a></li>
```

### Social Links
Modify social media links in the footer to your profiles:
```html
<a href="https://github.com/yourusername" target="_blank">...</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank">...</a>
```

### Adding More Projects
Duplicate a project card and modify the content:
```html
<div class="project-card">
    <h3>Project Name</h3>
    <p class="project-role">Your Role | Type</p>
    <div class="tech-stack">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
    </div>
    <p class="project-description">Project description...</p>
    <a href="https://github.com/..." class="project-link" target="_blank">
        <i class="ri-github-fill"></i>
        View Code
    </a>
</div>
```

## Icons

This website uses Remix Icon (https://remixicon.com/) for social media and UI icons. Icons are loaded from CDN, so no installation needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

You can deploy this website to:
- **Netlify**: Drag and drop the folder or connect your GitHub repo
- **Vercel**: Similar to Netlify, easy drag-and-drop deployment
- **GitHub Pages**: Push the files to a GitHub repository
- **Any web hosting service**: Simply upload the HTML file

## Tips for Best Results

1. Keep project descriptions concise but informative (2-3 lines)
2. Use relevant technology tags that match your actual experience
3. Ensure all external links (GitHub, LinkedIn) are correct
4. Test the website on mobile devices to verify responsiveness
5. Update your portfolio regularly with new projects
6. Add a professional headshot image if desired

## License

Feel free to use and modify this template for your personal portfolio.

---

For questions or improvements, feel free to customize and enhance the design!
