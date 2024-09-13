# Cy-My-Portfolio

Portfolio Website - Carlos Yajie Fetizanan


Project Overview

This project is a personal portfolio website that showcases my projects, skills, and experience. It is designed to be fully responsive and optimized for different screen sizes, including desktop, tablet, and mobile devices. The website is built using HTML, CSS, and media queries for responsiveness, with animations to enhance the user experience.


Design Choices

1. Responsive Layout:
Approach: I used a combination of flexbox and media queries to ensure that the layout adapts smoothly across various screen sizes. The website has three distinct layouts: desktop, tablet, and mobile.

    Why: The goal is to provide an optimized user experience across devices, ensuring that the content is easily accessible and readable regardless of the screen size.

    Implementation:
    Desktop version uses a horizontal navigation bar with large images and text for clarity.

    Tablet version has a more compact layout with a different navigation style.

    Mobile version adopts a vertical layout for easier scrolling and smaller image sizes for faster loading.


2. CSS Root Variables and Preset Design:

    Approach: I defined global styles and variables using :root in CSS to maintain consistency throughout the website.

    Why: This makes the code more maintainable and easier to update, especially when it comes to managing colors, font sizes, and spacing across different elements.

    Implementation:
    In the :root selector, I declared variables such as primary colors, font sizes, and margin values. This allowed me to apply changes globally by simply updating the variables.

    For example:
    css
    Copy code
    :root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --font-main: 'Arial', sans-serif;
    --font-size-large: 2rem;
    --font-size-small: 1rem;
    }

This approach simplified theme management and ensured a consistent look and feel throughout the site.


3. Custom Animations using Keyframes:

    Approach: I incorporated CSS animations using @keyframes to add subtle effects, making the website more dynamic and engaging without overwhelming the user.
    Why: Animations provide a more interactive and engaging user experience when used sparingly. Keyframes allow for smooth transitions and highlight important elements such as navigation links or project images.
    Implementation:
    I created animations like fading in, sliding, and hovering effects using keyframes. For example, a simple fade-in animation for project images:
    css
    Copy code
    @keyframes fadeIn {
    from {
    opacity: 0;
    }
    to {
    opacity: 1;
    }
    }

    .project-img {
    animation: fadeIn 2s ease-in-out;
    }

This animation is applied when the project images load, making them appear smoothly on the screen.


4. Image Optimization:

    Approach: All images, including the profile picture and project screenshots, were resized and optimized to ensure fast loading times without compromising quality.
    Why: Optimized images are crucial for performance, especially on mobile devices where load times are critical.
    Implementation: I used tools to compress images and renamed them to follow proper naming conventions (e.g., no spaces) to avoid issues during development and deployment.


5. Simple and Clean Design:

    Approach: I opted for a minimalist design with a focus on readability and simplicity. The use of whitespace ensures that the content is not overwhelming for users.
    Why: A clean design not only improves the aesthetic but also enhances usability by allowing users to navigate easily.
    Implementation: The color palette is kept minimal, with a focus on black, white, and accents of blue for highlights. This ensures the design remains 
    professional while drawing attention to important content.


Challenges Faced & Solutions

1. File Naming and Path Issues:
Challenge: Initially, I encountered errors due to spaces and special characters in image file names, causing broken paths and rendering issues.
Solution: I resolved this by renaming all image files to remove spaces and special characters, replacing them with underscores and ensuring proper URL encoding when necessary. This ensured compatibility across browsers and systems.
2. Responsive Design Tweaks:
Challenge: Achieving consistent behavior across different screen sizes and browsers required multiple adjustments.
Solution: I used developer tools for different browsers to debug and test the layout. I also applied media queries to make the design adaptable to a range of devices, ensuring that the site looks good on both small and large screens.
3. JavaScript Limitation:
Challenge: The lack of JavaScript limited my ability to fine-tune certain aspects of the page’s dynamic behavior, particularly in adjusting the layout and sizing based on user interactions or more complex conditions.
Solution: Although CSS and media queries were sufficient for basic responsiveness, JavaScript would have allowed for more precise control, such as resizing elements dynamically or creating a more interactive user experience. Moving forward, incorporating JavaScript for these interactions will be a priority to improve usability.
4. Version Control:
Challenge: During development, there were issues with keeping the project synced with GitHub due to untracked files and deleted images not being properly staged.
Solution: I refined my Git workflow by ensuring all changes were staged and tracked properly before committing. This involved running git status frequently, using git add to track new files, and ensuring smooth pushes to the remote repository.
Conclusion
This portfolio project was a valuable learning experience, allowing me to refine my skills in web development, particularly in responsive design, animations, and version control. The use of CSS root variables and animations via keyframes allowed me to create a dynamic and consistent user interface. Although the lack of JavaScript limited the ability to fully customize some dynamic elements and page sizing, I look forward to enhancing this in future iterations. The challenges I faced helped me better understand best practices for file management, responsive design, and Git workflow, which I will apply in future projects.