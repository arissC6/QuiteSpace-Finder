# QuiteSpace Finder 🌿

A beautiful, community-powered web application that helps people discover calm, quiet spaces for work, study, and rest.

## 🎯 Problem Statement

People struggle to find peaceful, quiet places to focus. Whether you're a student cramming for exams, a remote worker needing deep focus, or a senior seeking tranquility, finding the right environment can be challenging.

## ✨ Solution

QuiteSpace Finder is a real-time crowdsourced platform that maps quiet spaces in your area with live crowd indicators and noise-level reporting. Users can check in to share their experience and help others find perfect calm spaces.

## 🚀 Core Features

### MVP (Current)
- **Place Listings**: Browse libraries, parks, and cafes
- **Real-Time Check-ins**: Community-powered availability updates
- **Crowd Level Indicators**: Visual representation of current occupancy
- **Noise Level Reporting**: User-reported noise metrics
- **Interactive Modal**: Detailed information for each location

### Planned Features
- Interactive map with Mapbox integration
- Book-a-seat integration for libraries
- User authentication with Supabase
- Supabase real-time database for live updates
- User profiles and check-in history
- Review and rating system

## 🎨 Design

### Color Palette (Pastel Mint)
- **Primary Mint**: `#9AC5BB`
- **Primary Light**: `#B8E0DB`
- **Primary Pale**: `#D4E8E4`
- **Accent Soft**: `#E0F4F1`
- **Background**: `#F0F9F7`

### Typography
- Clean, modern sans-serif fonts
- Responsive typography
- Accessible font sizes and contrast ratios

### Branding
- Playful, photorealistic design
- Relaxing visual elements (nature, parks, peaceful spaces)
- Logo featuring location pin with peaceful landscape

## 📱 Tech Stack

### Current (HTML/CSS/JavaScript MVP)
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and transitions
- **JavaScript**: Vanilla JS for interactivity

### Planned
- **Frontend**: React + TypeScript
- **Mapping**: Mapbox GL
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Hosting**: Vercel or GitHub Pages

## 📂 Project Structure

```
QuiteSpace-Finder/
├── index.html          # Main HTML file
├── styles.css          # Global styles & responsive design
├── script.js           # Core functionality & interactions
├── assets/
│   └── logo.svg        # Main logo (SVG)
└── README.md          # This file
```

## 🎯 Target Audience

- **Students**: Finding quiet study spaces
- **Remote Workers**: Seeking focus-friendly environments
- **Seniors**: Looking for peaceful, accessible places
- **General Users**: Anyone seeking tranquility

## 💡 Features Breakdown

### Place Cards
- Place name and emoji icon
- Type badge (Library, Park, Cafe)
- Crowd level indicator (1-5 scale)
- Noise level indicator (1-5 scale)
- Total check-ins count
- Quick-view details button

### Modal Details
- Complete place information
- Real-time crowd and noise data
- Recent user check-ins
- Check-in button
- Book a seat option

### Real-Time Updates
- Simulated updates every 30 seconds
- Dynamic crowd level changes
- Live check-in counters
- Responsive filtering

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Accessible navigation

## 🌐 Live Features

- **Filter by Type**: All, Libraries, Parks, Cafes
- **Check-in System**: Contribute to crowd data
- **Real-time Simulation**: Dynamic updates
- **Smooth Animations**: Enhance user experience
- **Accessibility**: Keyboard navigation, ARIA labels

## 🚀 Getting Started

### No Installation Required
This is a static website! Simply:
1. Clone the repository
2. Open `index.html` in a web browser
3. Explore quiet spaces and check in!

### Local Development
```bash
# Clone the repo
git clone https://github.com/arissC6/QuiteSpace-Finder.git

# Navigate to the directory
cd QuiteSpace-Finder

# Open in your browser
open index.html
# or
python -m http.server 8000
# Then visit http://localhost:8000
```

### Deploy to GitHub Pages
1. Go to repository settings
2. Enable GitHub Pages
3. Select main branch as source
4. Access your live site at `https://arissC6.github.io/QuiteSpace-Finder/`

## 📊 Sample Data

The app comes with 6 pre-configured locations:
- Central Library (quiet, low crowd)
- Green Park (peaceful, natural)
- Peaceful Cafe (cozy atmosphere)
- Riverside Reading Room (scenic quiet)
- Zen Garden Park (meditative space)
- Cozy Corner Cafe (intimate setting)

Each location includes:
- Real-time crowd levels (1-5)
- Noise indicators (1-5)
- Recent check-in data
- Type categorization

## 🎮 User Interactions

1. **Browse**: Scroll through available quiet spaces
2. **Filter**: Sort by type (Library, Park, Cafe)
3. **View Details**: Click any place card to see full information
4. **Check In**: Contribute to community data
5. **Explore**: Use navigation menu to jump between sections

## ♿ Accessibility Features

- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast ratios meet WCAG AA standards
- Focus management in modals
- Responsive text sizing

## 🔮 Future Roadmap

- **Phase 2**: React + Mapbox integration
- **Phase 3**: Supabase real-time database
- **Phase 4**: User authentication & profiles
- **Phase 5**: Mobile apps (React Native)
- **Phase 6**: AI-powered recommendations

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

We welcome contributions! Areas for improvement:
- Additional place types
- Enhanced filtering options
- Mobile optimization
- Accessibility improvements
- Bug fixes and performance

## 📧 Contact & Support

- **Report Issues**: Use GitHub Issues
- **Feature Requests**: GitHub Discussions
- **Questions**: GitHub Discussions

## 🙏 Acknowledgments

Designed with love for everyone seeking moments of peace.

---

**QuiteSpace Finder**: Find your calm space. Share your peace. 🌿✨

Last Updated: June 2024