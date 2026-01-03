# Contributing to Sorta

Thank you for considering contributing to Sorta! This document provides guidelines for contributing to the project.

## 🌟 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/supunhg/Sorta/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features
1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

#### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/Sorta.git
cd Sorta

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Development Workflow
1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Follow the code style and architecture
3. **Test thoroughly**: Ensure all features work correctly
4. **Commit**: Use clear, descriptive commit messages
5. **Push**: `git push origin feature/your-feature-name`
6. **Open PR**: Create a pull request with clear description

#### Code Style
- Use TypeScript for type safety
- Follow existing code patterns
- Add comments for complex logic
- Keep components focused and reusable
- Use meaningful variable and function names

#### Adding New Algorithms
1. Create a new file in `src/algorithms/`
2. Implement the `Algorithm` interface:
```typescript
import type { Algorithm, Step } from '../types/algorithm';

export const yourSort: Algorithm = {
  name: 'Your Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    // Your implementation
    return steps;
  },
};
```
3. Add to `src/algorithms/index.ts`
4. Add algorithm info to `src/data/algorithmInfo.ts`
5. Add pseudocode to `src/data/algorithmCode.ts`

#### Testing Checklist
- [ ] Algorithm generates valid steps
- [ ] Visualization renders correctly
- [ ] Performance metrics are accurate
- [ ] Works in comparison mode
- [ ] Code panel displays pseudocode
- [ ] Algorithm info is complete
- [ ] No console errors
- [ ] Responsive on mobile

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:
- `feat: add radix sort algorithm`
- `fix: correct heap sort step generation`
- `docs: update README with new features`
- `style: improve mobile responsive layout`
- `refactor: optimize canvas rendering`
- `perf: reduce step calculation overhead`

## 🎯 Project Goals

Keep these principles in mind:
- **Educational**: Make algorithms easy to understand
- **Interactive**: Encourage exploration and experimentation
- **Performance**: Maintain smooth animations
- **Accessible**: Work well on all devices
- **Clean Code**: Maintain readability and maintainability

## 💡 Ideas for Contributions

### High Priority
- Add more sorting algorithms (Radix, Bucket, Tim Sort)
- Improve mobile experience
- Add algorithm complexity analysis graphs
- Create tutorial/walkthrough mode

### Medium Priority
- 3D visualization mode
- More bar styles and themes
- Algorithm race mode enhancements
- Export visualizations as GIF/video

### Nice to Have
- Pathfinding algorithm visualizations
- Graph algorithm visualizations
- Internationalization (i18n)
- Dark/light theme customization

## 🤔 Questions?

Feel free to:
- Open an issue for discussion
- Reach out to [@supunhg](https://github.com/supunhg)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated!

---

Made with ❤️ by the Sorta community
