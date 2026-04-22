# AI Founder's Toolkit

A simple, elegant web application that helps entrepreneurs collect and organize feedback on their business ideas from stakeholders.

## Features

✅ **Problem Definition** - Clearly articulate the problem your business idea solves
✅ **Dual Stakeholder Feedback** - Gather feedback from 2 stakeholders on each problem
✅ **Persistent Storage** - All ideas and feedback are saved locally using browser storage
✅ **Clean Interface** - Modern, responsive design works on desktop, tablet, and mobile
✅ **Easy Management** - View all your ideas at a glance and delete as needed

## How to Use

1. **Open the App** - Simply open `index.html` in your web browser
2. **Enter Your Problem** - Describe the problem your business idea addresses
3. **Add Stakeholder Feedback** - Get feedback from 2 people about your problem:
   - Enter their name
   - Share their feedback on the problem
4. **Save** - Click "Save Idea & Feedback" to store your entry
5. **Review** - All saved ideas appear on the right side, organized with the newest first
6. **Manage** - Delete ideas you no longer need

## Getting Started

### Local Development
```bash
# No installation needed! Just open the file:
open index.html
# or
firefox index.html
# or double-click index.html in your file explorer
```

### Using with a Local Server (Optional)
```bash
# If you have Python 3 installed:
python -m http.server 8000

# If you have Node.js http-server:
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
.
├── index.html      # Main HTML structure and form
├── styles.css      # Professional styling and responsive design
├── script.js       # JavaScript for functionality and data management
├── README.md       # This file
└── LICENSE         # License information
```

## Features Detail

### Data Persistence
- All ideas and feedback are automatically saved to your browser's local storage
- Data persists between sessions (survives browser refresh)
- No server or database required

### Responsive Design
- Works perfectly on desktop computers
- Mobile-friendly interface for on-the-go access
- Touch-friendly buttons and forms

### Input Validation
- Form ensures all fields are filled before saving
- Prevents empty submissions
- User-friendly error messages

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features for future versions:
- Export feedback to PDF
- Share ideas with team members
- Rate the feedback quality
- Add more stakeholder perspectives
- Cloud synchronization
- Idea templates

## License

See LICENSE file for details.

## Support

For issues or suggestions, please create an issue in the repository.
