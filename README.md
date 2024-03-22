# babylonjs-infinite-world-traversal

This project is a **work-in-progress** [Babylon.js](https://babylonjs.com) demo that aims to showcase infinite world traversal by moving the world
instead of the camera when the player moves. The goal is to efficiently load and unload parts of the world as the player
explores, ensuring smooth performance and minimal memory usage.

Planned features include:

- Keyboard/mouse/trackpad controls for desktop users
- Touchscreen controls for mobile devices
- VR headset with controller support for immersive exploration

Please note that the project is in the early stages of development, and the mentioned features are currently in the
planning phase.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (for managing dependencies)

## Installation

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/nurse-the-code/babylonjs-infinite-world-traversal.git
   cd babylonjs-infinite-world-traversal
   ```

2. Install the dependencies:

   ```sh
   pnpm install
   ```

3. Start the development server:

   ```sh
   pnpm run dev
   ```

   This command serves your app at `http://localhost:3000` and provides you with a development environment that automatically reloads when you make changes to the code.

## Building and Running Production

When you're ready to build for production, use:

```sh
pnpm run build
```

This command builds your app for production to the `dist` folder. It optimizes the build for the best performance: the build is minified, and filenames include the hashes.

To preview the production build, you can use:

```sh
pnpm run preview
```

## Formatting and Code Style

### Checking Code Style with Prettier

To verify if your project files conform to the specified code style without making any changes to them, run:

```sh
pnpm format:check
```

This is particularly useful for continuous integration (CI) workflows to ensure all committed code adheres to the project's formatting standards.

### Applying Code Formatting

Before committing your changes, ensure your code is properly formatted according to the project's standards by running:

```sh
pnpm format:write
```

This command will automatically format your files using Prettier, promoting a consistent and readable codebase.

## Troubleshooting Common Issues

If you encounter issues with node modules or package installations, you can reset your project environment using:

```sh
pnpm nuke
```

This command will remove all node modules, lock files, and reinstall the dependencies, often resolving common setup issues.

## Learning Resources

Here are some resources to help you get up to speed with the tools and technologies used:

- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [BabylonJS Documentation](https://doc.babylonjs.com/)
