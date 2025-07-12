# Company Logos

This directory contains company logos for the experience timeline. Add your company logo files here with the following naming convention:

## Expected Logo Files

- `haptik.png` - Haptik company logo
- `johnson-controls.png` - Johnson Controls company logo  
- `pegasus.png` - Pegasus InfoCorp company logo
- `rheal.png` - Rheal Software company logo
- `navteq.png` - Navteq company logo

## Logo Requirements

- **Format**: PNG, JPG, or SVG
- **Size**: Recommended 200x200px or higher (will be automatically resized to 50x50px)
- **Background**: Transparent PNG preferred for best appearance
- **Quality**: High resolution for crisp display

## How to Add/Update Logos

1. Save your company logo files in this directory
2. Use the exact filenames listed above
3. If a logo file is not found, the timeline will automatically display company initials instead
4. You can update the logo paths in `script.js` if you want to use different filenames

## Fallback Behavior

If a logo file is missing or fails to load, the system will automatically:
1. Hide the broken image
2. Display the company's initials in a styled placeholder
3. Continue to function normally without any errors

This ensures your timeline always looks professional even without logo files.