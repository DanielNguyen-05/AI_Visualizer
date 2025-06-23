# AI Visualizer - Group 04

AI Visualizer is a comprehensive web-based platform that provides interactive visualization and analysis tools for artificial intelligence algorithms and data processing techniques. The application combines a robust Node.js backend with an intuitive frontend interface, enabling users to explore and understand complex AI concepts through dynamic visual representations.

## Overview

This project addresses the need for accessible AI education and algorithm comprehension by offering real-time visualizations of various computational processes. Whether you're a student learning fundamental algorithms or a professional analyzing complex data patterns, AI Visualizer provides the tools necessary for effective understanding and presentation.

## Key Features

### Core Functionality
- **Advanced Algorithm Visualization**: Interactive demonstrations of pathfinding algorithms, search techniques, sorting methods, and machine learning processes
- **Real-Time Data Processing**: Live updates and dynamic feedback during algorithm execution
- **Customizable Parameters**: Adjustable settings and configurations to accommodate diverse use cases and learning objectives
- **Responsive Design**: Optimized user interface that adapts seamlessly across desktop and mobile devices

### Technical Capabilities
- **Performance Monitoring**: Built-in analytics to track algorithm efficiency and execution metrics
- **Export Options**: Save visualizations and results in multiple formats for documentation and sharing
- **Educational Resources**: Integrated explanations and documentation for supported algorithms

## Technical Requirements

### System Prerequisites
- **Node.js**: Version 14.0 or higher ([Download](https://nodejs.org/))
- **Package Manager**: Yarn 
- **Browser**: Modern web browser with JavaScript enabled
- **Operating System**: Cross-platform compatibility (Windows, macOS, Linux)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd AI_Visualizer
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```
   *Alternative with npm:*
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy environment template (if applicable)
   cp .env.example .env
   # Edit configuration as needed
   ```

4. **Start Development Server**
   ```bash
   yarn start
   ```

5. **Access Application**
   
   Open your web browser and navigate to: `http://localhost:4000`

6. **Stop Server**
   
   Press `Ctrl + C` in the terminal to terminate the development server.

## Technology Stack
- **Backend**: Node.js with Express.js framework
- **Frontend**: EJS, CSS, JavaScript
- **Data Processing**: Custom algorithms and visualization libraries
- **Development Tools**: Yarn for package management

## Vercel Deployment
1. Ensure `vercel.json` configuration is properly set up
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy automatically on push to main branch

