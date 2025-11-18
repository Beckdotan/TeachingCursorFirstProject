# Interactive Simulation App

A React-based web application featuring three interactive simulations: bouncing balls physics, network visualization, and a color matching game.

## 📋 What's This Project?

This is a learning project that demonstrates:
- React component architecture
- Canvas-based animations
- Interactive user interfaces
- State management with React hooks
- Responsive design

## ✨ Features

🎯 **Three Interactive Simulations:**
1. **Bouncing Balls** - Physics simulation with gravity and collision detection
2. **Network Visualization** - Dynamic particle network with interactive nodes
3. **Color Matching Game** - Test your color perception skills

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have these installed on your computer:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - To check if installed: `node --version`

2. **npm** (comes with Node.js)
   - To check if installed: `npm --version`

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

### Installation Steps

**Step 1: Clone or Download the Project**

Option A - Using Git:
```bash
git clone <your-repo-url>
cd TeachingCursorFirstProject
```

Option B - Without Git:
- Download the project as a ZIP file
- Extract it to your desired location
- Open Terminal/Command Prompt and navigate to the project folder

**Step 2: Install Dependencies**

In the project folder, run:
```bash
npm install
```

This will download all required packages (may take a few minutes).

**Step 3: Start the Development Server**

```bash
npm start
```

The app will automatically open in your browser at [http://localhost:3000](http://localhost:3000)

If it doesn't open automatically, just type that URL into your browser.

## 🎮 How to Use

1. **Switch Between Simulations** - Click the tabs at the top to switch between different simulations
2. **Interact** - Each simulation has its own controls and interactive elements
3. **Have Fun!** - Experiment with the settings and see what happens

## 📁 Project Structure

```
TeachingCursorFirstProject/
├── src/
│   ├── App.js                  # Main app component with tab navigation
│   ├── App.css                 # Main app styling
│   ├── BallSimulation.js       # Bouncing balls simulation
│   ├── FluidSimulation.js      # Network visualization
│   ├── ColorMatchingGame.js    # Color matching game
│   └── index.js                # App entry point
├── public/
│   └── index.html              # HTML template
├── package.json                # Project dependencies
└── README.md                   # This file!
```

## 🛠️ Available Commands

### Development

```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it.
- The page reloads when you make changes
- You'll see build errors and lint warnings in the console

### Build for Production

```bash
npm run build
```
Creates an optimized production build in the `build` folder.
- Minified and optimized for best performance
- Ready to deploy!

### Run Tests

```bash
npm test
```
Launches the test runner in interactive watch mode.

## 🐛 Troubleshooting

### Port 3000 Already in Use
If you see an error about port 3000 being in use:
```bash
# Kill the process using port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Dependencies Won't Install
Try clearing the npm cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### App Won't Start
1. Make sure you're in the correct directory
2. Check that Node.js is installed: `node --version`
3. Try deleting `node_modules` and running `npm install` again

## 📚 Learning Resources

- [React Documentation](https://react.dev/) - Learn React basics
- [JavaScript.info](https://javascript.info/) - JavaScript tutorials
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference

## 🤝 Contributing

This is a learning project! Feel free to:
- Experiment with the code
- Add new simulations
- Improve existing features
- Share what you learn!

## 📄 License

This project is open source and available for educational purposes.

## 🙋 Need Help?

If you run into issues:
1. Check the Troubleshooting section above
2. Make sure all prerequisites are installed
3. Try the "Dependencies Won't Install" steps
4. Search for your error message online - you're probably not the first to encounter it!

---

**Built with React** ⚛️ | **Made for Learning** 📚
