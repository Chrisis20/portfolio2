# How to Add Your Images to the Gallery

## Step 1: Create an Images Folder

In your portfolio folder, create a new folder called `images`:

```
portfolio2/
  ├── index.html
  ├── styles.css
  ├── script.js
  ├── images/          ← Create this folder
  │   ├── artwork1.jpg
  │   ├── artwork2.jpg
  │   └── ...
  └── README.md
```

## Step 2: Add Your Artwork Images

Place your artwork files in the `images` folder. Supported formats:
- JPG/JPEG
- PNG
- GIF
- WebP

## Step 3: Update the HTML

Open `index.html` and find the gallery items (around line 148). Each gallery item looks like this:

```html
<div class="gallery-item"
     data-category="digital"
     data-image="images/artwork1.jpg"
     data-title="Artwork Title 1"
     data-description="Digital Art">
```

**Update these attributes:**

- `data-image="images/YOUR_IMAGE.jpg"` - Path to your image file
- `data-title="Your Artwork Name"` - The title of your artwork
- `data-description="Your Description"` - Brief description or category

### Example:

```html
<div class="gallery-item"
     data-category="digital"
     data-image="images/dragon-painting.jpg"
     data-title="Dragon at Sunset"
     data-description="Digital Illustration">
```

## How the Lightbox Works

When someone clicks on any gallery item:
1. The image opens fullscreen with a smooth zoom animation
2. The title and description appear below the image
3. Click the X button (top right) to close
4. Press ESC key to close
5. Click outside the image to close

## Features

- **Fullscreen viewing** - Your art displayed at maximum size
- **Animated close button** - Rotates on hover
- **Keyboard support** - ESC key closes the lightbox
- **Smooth animations** - Zoom in/out effects
- **Purple theme** - Matches your portfolio aesthetic
- **Mobile responsive** - Works perfectly on all devices

## Tips

- Use high-quality images (at least 1920px wide)
- Keep file sizes reasonable (compress if over 2MB)
- Use descriptive titles and categories
- Name your files clearly (no spaces, use hyphens)
