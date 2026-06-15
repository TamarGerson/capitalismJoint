# Step 1 Code Explanation: Canvas & Videos

In this step, we built the core interactive framework for the site. Here's a breakdown of the components we created and how they work.

---

## 🏗️ Components Breakdown

### 1. `CanvasContainer.tsx` (The Dragging System)
*   **What it does:** This component acts like a camera looking at a massive 2D world. It captures mouse movements to pan around the scene.
*   **How it works:** 
    *   We track state variables: `isDragging`, `startX`, `startY`, `scrollLeft`, and `scrollTop`.
    *   `onMouseDown`: Records the starting position of the mouse click.
    *   `onMouseMove`: Calculates the distance the mouse has moved (`walkX`, `walkY`) and updates the scroll position of the `div`.
    *   `onMouseUp` / `onMouseLeave`: Stops the dragging action.
*   **C++ Analogy:** Imagine writing a 2D viewport manager using SDL or SFML. You capture mouse events and update an offset vector that translates the rendering coordinate system.

### 2. `VideoCard.tsx` (Hover & Play)
*   **What it does:** Renders a video that plays only when the mouse is over it and pauses otherwise, resuming from where it left off.
*   **How it works:**
    *   We use a React `useRef` hook to get a direct reference to the raw HTML `<video>` element in the DOM.
    *   `onMouseEnter`: Sets `muted = false` and calls `.play()`.
    *   `onMouseLeave`: Calls `.pause()`.
*   **C++ Analogy:** Holding a direct pointer to an audio/video buffer resource (`sf::Music*`) and calling its `play()` and `pause()` methods directly based on collision detection with the mouse cursor.

### 3. `LandingPage.tsx` (The Scene Assembler)
*   **What it does:** Brings all the pieces together. It sets up the 5000x5000 canvas, places the fixed header, places the focal images, and scatters the videos.
*   **How it works:**
    *   It uses `useMemo` to generate random `left` and `top` coordinates for the videos based on the configuration in `videos.json`. This ensures the random positions are calculated once and don't scramble every time the UI updates.
    *   It uses explicit `z-index` layering to ensure videos are *behind* the main focal elements but the header is above everything.

---

## ⚙️ Configuration & Adding Your Assets

### 1. Where to link your Videos
We created a configuration file at `src/config/videos.json`. 
To add your videos:
1.  Create a folder: `public/assets/videos/`.
2.  Place your `.mp4` video files in that folder.
3.  Open `src/config/videos.json` and update the `videoSources` array with the paths (e.g., `"/assets/videos/my_video.mp4"`). You can also change the `totalSpawnCount` to spawn more or fewer video cards.

### 2. How to bring in Fonts from your computer
Currently, the site uses standard system fonts. To load the custom fonts from your Figma design:
1.  Create a folder: `src/assets/fonts/` (inside the `src` directory).
2.  Copy your font files (e.g., `.otf`, `.ttf`, or `.woff2` files) into that folder. If you have an `.otf` font file, that is perfectly fine!
3.  Open `src/index.css`. At the very top, there is a commented-out block for `@font-face`. Uncomment it and configure it. For example, if your font file is named `MyFont.otf`, it would look like this:
    ```css
    @font-face {
      font-family: 'TheBasics';
      src: url('./assets/fonts/MyFont.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
    ```
    *Note: Use `format('opentype')` for `.otf` files, `format('truetype')` for `.ttf` files, and `format('woff2')` for `.woff2` files.*
4.  Once that block is active, the `font-family: 'TheBasics', ...` rule on the `body` tag will automatically apply your font everywhere!

### 3. Where to put Images
1.  Place your `main-base.png` and date/time images into `public/assets/`.
2.  In `src/views/LandingPage.tsx`, we have placeholder `div`s with the classes `main-base-image` and `date-time-image`. You can update the `<img src="...">` tags there to point to your actual image files once you save them.
