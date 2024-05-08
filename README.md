# Blog App

## How to Run Frontend

### Prerequisites
- Ensure you have Nodejs installed on your machine. If not, you can download it from [here](https://nodejs.org/en/download/).
- Please note that you'll need to start the backend server as well. Follow the instructions in the backend repository: [blog-app-api](https://github.com/trungnhanforwork/blog-app-api).

### Clone Repositories
First, clone the frotend repository by running the following command in your terminal:

```bash
git clone https://github.com/trungnhanforwork/blog-app-frontend.git
```

### Navigate to Frontend Directory
Next, navigate into the frontend directory using the following command:
```bash
cd blog-app-frontend
```

### Install Dependencies
Once you're in the frontend directory, install the required packages by running:
```bash
npm install
```

### Run the Project
Finally, to run the project, execute the following command:
```bash
npm run dev
```

The frontend project will be running locally through port 3500 at http://localhost:3500/.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh