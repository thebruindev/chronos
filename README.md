# Chronos

## ✨ Introduction

Welcome to the Chronos Project.
Chronos is meant to be an app enabling users to manage their tasks for their daily work.

## 🎯 Goal

The main purpose of the project besides the main feature, is to build it while learning the NextJs meta framework.

## 🛠️ Technologies Used

This project leverages the following technologies to deliver a seamless and efficient application:

- **Next.js**: A powerful React framework that enables server-side rendering and static site generation for better performance and SEO.
- **Convex**: A Backend-as-a-Service (BaaS) solution, providing seamless data storage, real-time syncing, and backend logic without the need to manage your own infrastructure.

- **Clerk**: A comprehensive authentication service, simplifying user management with pre-built solutions for sign-in, sign-up, and user profile management.

- **ShadCN**: A modern UI component library for building accessible and customizable user interfaces, designed to work smoothly with modern front-end frameworks.

- **Tailwind CSS**: A utility-first CSS framework, offering a set of pre-designed classes to build responsive layouts quickly and efficiently. Tailwind enhances the project with ShadCN for faster and more consistent styling.

---

## 🚀 Getting Started

Welcome to the project. Follow these instructions to get the project up and running on your local machine, and understand the branching workflow to collaborate effectively.

---

##  🛠️ 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/thebruindev/chronos.git
cd chronos
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🐳 2. Setup and Run the Project with Docker

This project uses Docker for consistent development environments. Ensure you have Docker installed on your machine before proceeding.

### Step 1: Build the Docker Image

After cloning the repository, run the following command to build the Docker image:

```bash
docker-compose up --build
```

This will:

- Build the project.
- Install all necessary dependencies.
- Start the project on http://localhost:3000.

### Step 2: Access the Project

Once Docker is running, you can access the application by navigating to:

```text
http://localhost:3000
```

You should see the application running in your browser.

### Step 3: Stopping the Docker Containers

To stop the Docker containers, press CTRL + C in the terminal where Docker is running, or run:

```bash
docker-compose down
```

## 🌳 3. Branching Workflow

We follow a structured Git branching strategy to ensure smooth collaboration.

### Branches

`main` : This is the production branch. Only stable and fully tested code is merged into main. No one should push directly to main except the Tech Lead.
`dev` : This is the development branch. All new features and bug fixes are merged into dev through pull requests.

### Feature Branches

When working on a new feature or bug fix, create a feature branch off `dev`.
Feature branches can be named anything as of now, you are not restricted to a specific naming pattern.

### Example Workflow:

#### 1. Create a Feature Branch:

```bash
git checkout dev
git pull origin dev  # Make sure your dev branch is up-to-date
git checkout -b feature/my-new-feature
```

#### 2. Work on the Feature and make commits:

```bash
git add .
git commit -m "Add new feature"
```

#### 3. Keep Your Feature Branch Updated:

If dev is updated while you're working, ensure you pull and rebase the latest changes before creating a pull request:

```bash
git checkout dev
git pull --rebase
git checkout <your-local-branch>
git rebase dev
# If conflicts are presents , resolve conflicts

# when ready to push changes after pull rebase do:
git push --force-with-lease
```

#### 4. Push Your Feature Branch:

This step is about pushing your changes when not doing a pull rebase:

```bash
git push <you-local-branch>
```

#### 5. Create a Pull Request:

Go to the GitHub repository and create a pull request from your feature branch to `dev`
After your pull request is reviewed and approved, it will be merged into `dev`.

## 🔒 4. Branch Protection Rules:

### main and dev Branch Protection:

Direct pushes to `main` and `dev` are restricted to ensure code quality and proper code review.
All changes to `main` and `dev` must go through a pull request and be approved

## 💻 5. Command commands:

#### Start the Project with Docker:

```bash
docker-compose up --build
```

Stop Docker Containers:

```bash
docker-compose down
```

Install Dependencies (If running without Docker):

```bash
npm install

```

#### Start the Project without Docker:
```bash
npm run dev
```

#### Start the Convex dev server:
```bash
npm convex dev
```

#### Adding a ShadCn component:
```bash
npx shadcn@latest add <the-component-you-want-to-add>   
```

## 📚 6. Documentation for Technologies Used

This project utilizes several key technologies. Below are links to the official documentation for each technology to help you understand and work with them more effectively:

- [**Next.js**](https://nextjs.org/docs) – A React framework for building server-side rendered and static web applications.
- [**TypeScript**](https://www.typescriptlang.org/docs/) – A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
- [**React**](https://reactjs.org/docs/getting-started.html) – A JavaScript library for building user interfaces, used at the core of Next.js.
- [**ESLint**](https://eslint.org/docs/user-guide/getting-started) – A static code analysis tool to help you identify and fix problems in your JavaScript/TypeScript code.
- [**Prettier**](https://prettier.io/docs/en/index.html) – A code formatter to ensure consistent style across the codebase.
- [**Docker**](https://docs.docker.com/get-started/) – A platform for developing, shipping, and running applications in containers, ensuring consistency across development environments.
- [**Docker Compose**](https://docs.docker.com/compose/) – A tool for defining and running multi-container Docker applications, used to manage the project environment.
- [**Shadcn UI**](https://shadcn.dev/) – A component library for building accessible React components with Tailwind CSS.
- [**Convex**](https://docs.convex.dev/) – A backend framework for building real-time applications with React, handling state, data sync, and more.
- [**Node.js**](https://nodejs.org/en/docs/) – The JavaScript runtime used to run the server-side code.
- [**NPM**](https://docs.npmjs.com/) – The package manager for JavaScript, used to manage dependencies.

Feel free to refer to these resources as you work on the project to get the most out of the tools we're using

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
