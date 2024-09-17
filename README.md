# Cy-My-Portfolio

Portfolio Website - Carlos Yajie Fetizanan

Project Overview:

    --Personal portfolio website showcasing projects, skills, and experience.
    --Fully responsive design optimized for desktop, tablet, and mobile.
    --Built with HTML, CSS, and media queries for responsiveness.
    --Animations enhance user experience.


Design Choices:

1. Responsive Layout:

    --Approach: Used flexbox and media queries for smooth adaptation across screen sizes.
    --Why: To ensure an optimized user experience across desktop, tablet, and mobile devices.

    --Implementation:
        --Desktop: Horizontal navigation bar, large images, and text.
        --Tablet: Compact layout with a different navigation style.
        --Mobile: Vertical layout, smaller image sizes for faster loading.

2. CSS Root Variables and Preset Design:

        --Approach: Defined global styles using
        in CSS for consistency.

        --Why: Easier maintenance and updates for colors, fonts, and spacing.

        --Implementation:

            --Variables for primary colors, font sizes, and margin values.
            --Example:
            --css
                :root {
                --primary-color: #3498db;
                --secondary-color: #2c3e50;
                --font-main: 'Arial', sans-serif;
                --font-size-large: 2rem;
                --font-size-small: 1rem;
                }

3.Custom Animations using Keyframes:

            --Approach: Incorporated CSS animations via @keyframes for dynamic effects.
            -- Why: To make the site more interactive and engaging without overwhelming the user.

            --Implementation:
                --Used fading, sliding, and hover effects.
                --Example: A fade-in animation for project images.
                --css
                    @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                    }
                    .project-img {
                    animation: fadeIn 2s ease-in-out;
                    }

4.Image Optimization:

            --Approach: Resized and compressed images for faster loading times.
            --Why: Crucial for performance, especially on mobile devices.
            --Implementation: Compressed images and followed proper naming conventions (e.g., no spaces).

5.Simple and Clean Design:

            --Approach: Minimalist design with focus on readability and simplicity.
            --Why: Enhances usability and navigation through a clean aesthetic.

            --Implementation:
                --Minimal color palette (black, white, blue accents).
                --Focus on whitespace for clarity.


Challenges Faced & Solutions:

1.File Naming and Path Issues:

            --Challenge: Errors due to spaces and special characters in image file names.
            --Solution: Renamed files to remove spaces and special characters, ensuring compatibility.

2.Responsive Design Tweaks:

            --Challenge: Achieving consistent behavior across different screen sizes and browsers.
            --Solution: Used browser developer tools and media queries to debug and test the layout.

3.JavaScript Limitation:

            --Challenge: Lack of JavaScript limited dynamic behavior (e.g., layout adjustments).
            --Solution: Focused on CSS/media queries for responsiveness, but plan to incorporate JavaScript in future iterations.

4.Version Control:

            --Challenge: Issues with untracked files and deleted images in GitHub workflow.
            --Solution: Improved Git workflow by frequently using git status and ensuring all changes were tracked before committing.

Conclusion:

            --Valuable learning experience in responsive design, animations, and version control.
            --CSS root variables and keyframes improved UI consistency and dynamism.
            --Will incorporate JavaScript in future versions for better interactivity.
            --Gained better understanding of file management, responsive design, and Git workflow.