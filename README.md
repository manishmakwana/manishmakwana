# Manish Makwana - Profile Website

A professional profile website featuring a LinkedIn-style work experience timeline.

## 🚀 Features

- **Professional Timeline**: LinkedIn-style work experience display
- **Company Grouping**: Experiences grouped by company with total duration calculation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Company Logos**: Support for custom company logo integration
- **Modern UI**: Clean, professional design with smooth animations
- **Current Position Highlighting**: Special styling for current roles

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling (LinkedIn-inspired design)
├── script.js           # JavaScript for timeline functionality
├── experience.json     # Work experience data
└── assets/
    └── logos/          # Company logo files
        └── README.md   # Logo requirements and guidelines
```

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Add company logos** (optional)
   - Place logo files in `assets/logos/` directory
   - Follow naming convention in `assets/logos/README.md`
   - If logos are missing, initials will be displayed automatically

3. **Update experience data**
   - Edit `experience.json` to add/modify work experience
   - Use the same format as existing entries
   - Set `end_date` to `null` for current positions

4. **Customize profile information**
   - Edit personal details in `index.html`
   - Update the about section
   - Replace placeholder profile image

5. **Deploy**
   - Upload files to any web hosting service
   - Or use GitHub Pages for free hosting

## 📝 Experience Data Format

```json
{
  "position": "Job Title",
  "start_date": "YYYY-MM",
  "end_date": "YYYY-MM",  // null for current position
  "company_name": "Company Name"
}
```

## 🎨 Customization

- **Colors**: Modify CSS variables in `styles.css`
- **Company Logos**: Update paths in `script.js` companyLogos object
- **Timeline Style**: Adjust timeline CSS classes
- **Responsive Breakpoints**: Update media queries as needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📧 Contact

**Email**: manishmakwana.13@gmail.com

---

*Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.*
