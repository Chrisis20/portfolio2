# Phoenix - Art Portfolio

A sleek, modern art portfolio website with a stunning black and purple aesthetic.

## Features

- **Responsive Design**: Looks great on all devices
- **Smooth Animations**: Elegant fade-ins and transitions
- **Clean Navigation**: Easy to find all sections
- **Modern Aesthetic**: Black background with purple accents
- **Optimized Layout**: Important information displayed first

## Sections

1. **Home/Hero**: Eye-catching introduction with your name
2. **About**: Your story and specialties
3. **Gallery**: Showcase your artwork
4. **Contact**: Easy ways to get in touch

## Customization Guide

### Adding Your Artwork

Replace the placeholder gallery items in `index.html` with your actual images:

```html
<div class="gallery-item">
    <img src="path/to/your/image.jpg" alt="Artwork description">
    <div class="gallery-overlay">
        <h3>Your Piece Title</h3>
        <p>Medium/Type</p>
    </div>
</div>
```

### Updating Contact Information

1. Change the email link in the contact section:
   ```html
   <a href="mailto:your-email@example.com" class="contact-button">Email Me</a>
   ```

2. Update social media links:
   ```html
   <a href="your-instagram-url" class="social-link">Instagram</a>
   ```

### Customizing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-purple: #a855f7;
    --secondary-purple: #7c3aed;
    --dark-purple: #5b21b6;
    /* etc... */
}
```

### Personalizing Content

Edit the text in `index.html` to reflect your unique story and artistic voice.

## How to Use

1. Open `index.html` in a web browser to view your portfolio
2. Host on GitHub Pages, Netlify, or any web hosting service
3. Share your portfolio URL with clients and collaborators

## Technologies Used

- HTML5
- CSS3 (with custom animations)
- Vanilla JavaScript
- Google Fonts (Playfair Display & Poppins)

---

Made with creativity and code ✨
