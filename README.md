# babylonjs-infinite-world-traversal

This project is a **work-in-progress** [Babylon.js](https://babylonjs.com) demo that aims to showcase "_infinite_" world
traversal by using a chunking system to selectively render parts of a procedurally-generated world. The goal is to
efficiently load and unload parts of the world as the player explores, ensuring smooth performance and minimal memory
usage.

Planned features include:

- Keyboard/mouse/trackpad controls for desktop users
- Touchscreen controls for mobile devices
- VR headset with controller support for immersive exploration

Limitations:

- Currently, there is no plan to support a mutable world state. The world will be procedurally generated and static.
- World coordinates beyond JavaScript's `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER` will not be supported.

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

   This command serves your app at `http://localhost:3000` and provides you with a development environment that
   automatically reloads when you make changes to the code.

## Husky Integration

[Husky](https://typicode.github.io/husky/) is integrated into this project to utilize Git hooks effectively. Git hooks
are scripts that run automatically before or after events such as `commit`, `push`, and more. Husky simplifies the
management of these hooks, allowing us to enforce quality checks and standards before code changes are committed.

### What Husky Does for This Project

In our project, Husky is configured to:

- **Format Code:** Ensures that all committed code adheres to our formatting standards, leveraging Prettier. If code
  formatting issues are detected, the commit will be halted until these issues are resolved.
- **Run Tests:** Executes our suite of tests to ensure that new changes don't break existing functionality. Commits are
  only successful if all tests pass, maintaining the integrity of our codebase.
- **Build Verification:** Confirms that the project builds successfully without errors. This check prevents merging
  broken code that could affect our deployment pipeline or disrupt others' work.

### Setting up Husky

Husky is set up through the `prepare` script in our `package.json`, which is run automatically after `pnpm install`.
This step ensures that Husky and its hooks are properly initialized and ready to safeguard our codebase.

```sh
pnpm install
```

This will install project dependencies and set up Husky by executing:

```sh
pnpm build && husky install
```

By integrating Husky, we automate and enforce our code quality standards, making our development process smoother and
more reliable.

## Building and Running Production

After you've made changes, and you're ready to build for production, use:

```sh
pnpm run build
```

This command builds your app for production to the `dist` folder. It optimizes the build for better performance: the
build is minified, and filenames include the hashes.

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

This is particularly useful for continuous integration (CI) workflows to ensure all committed code adheres to the
project's formatting standards.

### Applying Code Formatting

Before committing your changes, ensure your code is properly formatted according to the project's standards by running:

```sh
pnpm format:write
```

This command will automatically format your files using Prettier, promoting a consistent and readable codebase.

## Running Tests

To run tests once, use:

```sh
pnpm test:once
```

To keep tests running in watch mode as you make changes, use:

```sh
pnpm test:watch
```

## Troubleshooting Common Issues

If you encounter issues with node modules or package installations, you can reset your project environment using:

```sh
pnpm nuke
```

This command will remove all node modules, lock files, and reinstall the dependencies. After installation, it will
automatically run a build to ensure everything is set up correctly. This often resolves common setup issues.

## Learning Resources

Here are some resources to help you get up to speed with the tools and technologies used:

- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [BabylonJS Documentation](https://doc.babylonjs.com/)
- [Husky Documentation](https://typicode.github.io/husky/)
