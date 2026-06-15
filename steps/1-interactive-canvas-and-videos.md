# Step 1: Draggable Canvas, Random Videos, and Sticky Header

**Figma Design Reference:** [Figma Project - Base Kit Website](https://www.figma.com/design/9ckCYSnChdJRKyGkBMZSgK/base-kit-website?node-id=1-2&m=dev)

In this step, we will implement the core layout and interactivity of the website. This includes a large, draggable background canvas (allowing users to "roam" around the design space), randomized video elements scattered behind our focal imagery, and a fixed navigation header.

---

## 🎨 Design & Layout Specs
- **Target Viewport Size:** 1920px (width) × 1200px (height) — landscape PC aspect ratio.
- **Canvas Size:** A large canvas area (e.g., 5000px × 5000px) centered around the default focal viewport coordinates (Figma base start: `left: 1005px`, `top: 1198px`).
- **Layers & Hierarchy (Z-Index):**
  - **Z-Index 10 (Foreground):** Sticky `Header` component. Stays fixed to the top of the screen even when roaming.
  - **Z-Index 3 (Interactive Floating Items):** Register button overlay / interactive elements.
  - **Z-Index 2 (Middleground):** `Main Base Image` and the `Date and Time Image` blocks. These have static coordinates on the canvas.
  - **Z-Index 1 (Background):** Portrait videos (359px × 638px) scattered randomly across the canvas. They must always render behind the middleground elements.

---

## 💡 Web & React Concepts to Learn (C++ Analogies)

### 1. The Panning/Roaming Canvas
- **Web Concept:** Capturing mouse drag events (`onMouseDown`, `onMouseMove`, `onMouseUp`) and updating the scroll offset (`scrollLeft`, `scrollTop`) of a container.
- **C++ Analogy:** Similar to writing a 2D camera viewport system in a game engine (like SFML or SDL) where you track the camera's offset vector based on mouse drag offsets.

### 2. Video Playback Hooks (`HTMLVideoElement` Refs)
- **Web Concept:** Using React's `useRef` to directly access the underlying DOM `<video>` element, allowing us to programmatically trigger `.play()`, `.pause()`, `.currentTime`, and manage the sound/mute properties.
- **C++ Analogy:** Direct pointer access to a resource object (e.g., `sf::Music*` or a video pointer) to invoke play/pause methods rather than letting the UI manage it implicitly.

### 3. Dynamic Configuration (JSON)
- **Web Concept:** Storing video paths and counts in a static JSON file (`src/config/videos.json`) and importing it into the React component.
- **C++ Analogy:** Loading configuration properties from a `.json` or `.ini` file at runtime to parameterize the rendering loop without recompiling.

---

## 📋 TODO Checklist

### ⚙️ Configuration & Assets
- [x] Add the local image assets to `public/assets/` (`main-base.png`, date/time elements, logo).
- [x] Install local font files (e.g., `TheBasics-Regular`) and configure them in CSS using `@font-face` (in `src/assets/fonts/`).
- [x] Create `src/config/videos.json` to store the list of video paths and configuration settings (e.g., number of videos to spawn).

### 🖥️ Interactive Canvas
- [x] Create a `CanvasContainer` component that wraps the large workspace.
- [x] Implement mouse dragging/panning controls to allow the user to click-and-drag to "roam" the canvas.
- [x] Set the starting camera position (scroll offset) to center on the main base image (coords: `left: 1005px`, `top: 1198px`).

### 📹 Random Video Spawner
- [x] Create a `VideoCard` component that:
  - Accepts a video source.
  - Plays the video with sound on hover.
  - Pauses the video and retains the current timestamp when the mouse leaves.
  - Loops the video when it reaches the end.
- [x] Implement a positioning algorithm that randomly distributes `N` videos (based on config) across the canvas boundaries.
- [x] Ensure videos are styled as portrait rectangles (`359px` × `638px`) and rendered with `z-index: 1` (behind the main images).
- [x] Handle repeating videos if the requested spawn count is greater than the available video assets in the JSON config.

### 🖼️ Focal Elements & Header
- [x] Position the `Main Base Image` and `Date and Time Images` at their fixed canvas coordinates (`z-index: 2`).
- [x] Create the `Header` component (`z-index: 10`) fixed to the top of the browser viewport.
- [x] Style the header components: alignment, logo, links, and register button.
- [x] Add hover micro-animations to the navigation links and the Register button.
