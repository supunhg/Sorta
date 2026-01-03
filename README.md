# Sorta 🎨

> **Interactive Sorting Algorithm Visualizer** - Learn, visualize, and compare 12 sorting algorithms with real-time animations, benchmarks, and step-by-step execution.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

**[Live Demo](https://sorta-nine.vercel.app)** | **[GitHub](https://github.com/supunhg/Sorta)**

---

## ✨ Features

### 🎯 Core Capabilities
- **12 Sorting Algorithms**: Bubble, Cocktail Shaker, Comb, Gnome, Insertion, Selection, Shell, Heap, Merge, Quick, Counting, and Bogo Sort
- **Real-time Visualization**: Watch algorithms execute step-by-step with smooth canvas animations
- **Comparison Mode**: Run up to 4 algorithms side-by-side to compare performance
- **Interactive Controls**: Play, pause, step forward/backward, and adjust speed (0.25x - 100x)
- **Performance Metrics**: Track comparisons, swaps, array accesses, and overwrites in real-time

### 🚀 Power User Features
- **Step Bookmarking**: Mark important steps and jump between them instantly
- **Interactive Timeline**: Visual progress bar with bookmarks and instant seeking
- **Debug Panel**: View detailed information about current step and algorithm state
- **Benchmark Mode**: Run all algorithms on the same dataset and compare results
- **Code Display**: View pseudocode for each algorithm with syntax highlighting
- **Advanced Keyboard Shortcuts**: Full keyboard navigation and control

### 🎨 Customization
- **5 Color Themes**: Default, Sunset, Forest, Ocean, Purple Dream
- **4 Bar Styles**: Gradient, Solid, Outline, 3D Effect
- **Light/Dark Mode**: Toggle between themes
- **10 Data Patterns**: Random, Sorted, Reversed, Nearly Sorted, Few Unique, Wave, Mountain, Sawtooth, Zigzag, Custom
- **Sound Effects**: Optional audio feedback for operations

### 📱 User Experience
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Glass UI Design**: Modern glassmorphism aesthetic
- **Educational**: Detailed algorithm info cards with descriptions, use cases, and real-world applications
- **Export/Share**: Copy performance metrics and share configurations via URL

---

## 🎮 Keyboard Shortcuts

| Key | Action | Key | Action |
|-----|--------|-----|--------|
| `Space` | Play/Pause | `B` | Bookmark current step |
| `→` | Step forward | `Shift + →` | Next bookmark |
| `←` | Step backward | `Shift + ←` | Previous bookmark |
| `R` | Reset | `D` | Toggle debug panel |
| `N` | New random data | `C` | Toggle code panel |
| `M` | Toggle comparison mode | `I` | Toggle info panel |
| `T` | Toggle light/dark theme | `1-9` | Select algorithm |

---

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **Canvas API** - High-performance rendering
- **Web Audio API** - Sound effects
- **CSS3** - Glassmorphism and animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/supunhg/Sorta.git
cd Sorta

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📊 Supported Algorithms

| Algorithm | Time Complexity | Space | Description |
|-----------|----------------|-------|-------------|
| **Bubble Sort** | O(n²) | O(1) | Simple comparison sort with adjacent swaps |
| **Cocktail Shaker** | O(n²) | O(1) | Bidirectional bubble sort |
| **Comb Sort** | O(n log n) | O(1) | Improved bubble sort with gap sequence |
| **Gnome Sort** | O(n²) | O(1) | Simple sort moving elements to position |
| **Insertion Sort** | O(n²) | O(1) | Builds sorted array one element at a time |
| **Selection Sort** | O(n²) | O(1) | Repeatedly finds minimum element |
| **Shell Sort** | O(n log n) | O(1) | Generalized insertion sort with gaps |
| **Heap Sort** | O(n log n) | O(1) | Uses binary heap data structure |
| **Merge Sort** | O(n log n) | O(n) | Divide-and-conquer with merging |
| **Quick Sort** | O(n log n) avg | O(log n) | Divide-and-conquer with pivot partitioning |
| **Counting Sort** | O(n + k) | O(k) | Non-comparison sort for integers |
| **Bogo Sort** | O(n × n!) | O(1) | Random shuffle (for fun!) |

---

## 🏗️ Project Structure

```
Sorta/
├── src/
│   ├── algorithms/          # Algorithm implementations
│   │   ├── bubbleSort.ts
│   │   ├── mergeSort.ts
│   │   ├── quickSort.ts
│   │   └── ... (12 total)
│   ├── components/          # React components
│   │   ├── Visualizer.tsx   # Canvas rendering engine
│   │   ├── Controls.tsx     # Playback controls
│   │   ├── CodePanel.tsx    # Pseudocode display
│   │   ├── DebugPanel.tsx   # Debug information
│   │   ├── Timeline.tsx     # Interactive timeline
│   │   └── BenchmarkPanel.tsx
│   ├── hooks/
│   │   └── usePlayback.ts   # Playback state management
│   ├── types/
│   │   └── algorithm.ts     # TypeScript interfaces
│   ├── data/
│   │   ├── algorithmInfo.ts # Educational content
│   │   └── algorithmCode.ts # Pseudocode definitions
│   ├── App.tsx              # Main application
│   ├── App.css              # Styles
│   └── main.tsx             # Entry point
├── ARCHITECTURE.md          # Detailed architecture docs
├── README.md
├── LICENSE
└── package.json
```

---

## 🎯 Use Cases

### For Students
- **Learn Data Structures**: Visual understanding of how sorting algorithms work
- **Compare Efficiency**: See real-time performance differences
- **Study for Exams**: Use algorithm info cards and pseudocode
- **Interactive Practice**: Experiment with different data patterns

### For Educators
- **Teaching Tool**: Demonstrate algorithms in lectures
- **Assignment Reference**: Students can explore implementations
- **Benchmark Demonstrations**: Show real-world performance differences

### For Developers
- **Interview Prep**: Refresh knowledge of classic algorithms
- **Algorithm Selection**: Understand when to use which algorithm
- **Performance Analysis**: See actual operation counts

---

## 🌟 Highlights

### Architecture
- **Step-based Execution**: Deterministic playback with forward/backward stepping
- **Separation of Concerns**: Algorithms don't know they're being visualized
- **Type-safe Contracts**: Strict TypeScript interfaces ensure consistency
- **Performance Optimized**: Canvas rendering with requestAnimationFrame

### Educational Design
- Designed as a "**laboratory, not a textbook**"
- Algorithms should "**feel alive**"
- Focus on **exploration and discovery**
- Comprehensive **real-world context**

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Ideas for Contributions
- Add more sorting algorithms (Radix, Bucket, Tim Sort, etc.)
- Implement 3D visualization mode
- Add algorithm complexity analysis visualizations
- Create pathfinding algorithm visualizations
- Improve mobile experience
- Add more data patterns
- Translations/i18n support

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Supun Hewagamage**
- GitHub: [@supunhg](https://github.com/supunhg)

---

## 🙏 Acknowledgments

- Inspired by classic algorithm visualization tools
- Built with modern web technologies
- Designed for the next generation of developers

---

## 📈 SEO Keywords

sorting algorithms, algorithm visualization, data structures, computer science education, merge sort, quick sort, bubble sort, heap sort, algorithm animation, interactive learning, coding education, programming tutorial, algorithm comparison, performance benchmarking, React TypeScript, educational tools, CS fundamentals, algorithm complexity, visual learning, software engineering

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Supun Hewagamage](https://github.com/supunhg)

[Report Bug](https://github.com/supunhg/Sorta/issues) · [Request Feature](https://github.com/supunhg/Sorta/issues)

</div>
