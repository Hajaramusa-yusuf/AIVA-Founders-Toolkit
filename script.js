// AI Founder's Toolkit - Feedback Collector Script

class FeedbackCollector {
    constructor() {
        this.ideas = this.loadIdeas();
        this.initEventListeners();
        this.renderIdeas();
    }

    initEventListeners() {
        const form = document.getElementById('feedbackForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form values
        const problemStatement = document.getElementById('problemStatement').value.trim();
        const stakeholder1Resonate = document.getElementById('stakeholder1Resonate').value.trim();
        const stakeholder1Aspects = document.getElementById('stakeholder1Aspects').value.trim();
        const stakeholder1Concerns = document.getElementById('stakeholder1Concerns').value.trim();
        const stakeholder1Missing = document.getElementById('stakeholder1Missing').value.trim();
        const stakeholder2Resonate = document.getElementById('stakeholder2Resonate').value.trim();
        const stakeholder2Aspects = document.getElementById('stakeholder2Aspects').value.trim();
        const stakeholder2Concerns = document.getElementById('stakeholder2Concerns').value.trim();
        const stakeholder2Missing = document.getElementById('stakeholder2Missing').value.trim();

        // Validate inputs
        if (!this.validateInputs(problemStatement, stakeholder1Resonate, stakeholder1Aspects, stakeholder1Concerns, stakeholder1Missing, stakeholder2Resonate, stakeholder2Aspects, stakeholder2Concerns, stakeholder2Missing)) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        // Create idea object
        const idea = {
            id: Date.now(),
            problem: problemStatement,
            stakeholders: [
                {
                    resonate: stakeholder1Resonate,
                    aspects: stakeholder1Aspects,
                    concerns: stakeholder1Concerns,
                    missing: stakeholder1Missing
                },
                {
                    resonate: stakeholder2Resonate,
                    aspects: stakeholder2Aspects,
                    concerns: stakeholder2Concerns,
                    missing: stakeholder2Missing
                }
            ],
            createdAt: new Date().toLocaleString()
        };

        // Save idea
        this.ideas.push(idea);
        this.saveIdeas();
        this.renderIdeas();

        // Reset form
        document.getElementById('feedbackForm').reset();

        // Show success message
        this.showAlert('✅ Idea and feedback saved successfully!', 'success');
    }

    validateInputs(problem, s1r, s1a, s1c, s1m, s2r, s2a, s2c, s2m) {
        return problem.length > 0 && 
               s1r.length > 0 && s1a.length > 0 && s1c.length > 0 && s1m.length > 0 &&
               s2r.length > 0 && s2a.length > 0 && s2c.length > 0 && s2m.length > 0;
    }

    saveIdeas() {
        localStorage.setItem('founderToolkitIdeas', JSON.stringify(this.ideas));
    }

    loadIdeas() {
        const stored = localStorage.getItem('founderToolkitIdeas');
        return stored ? JSON.parse(stored) : [];
    }

    deleteIdea(id) {
        if (confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
            this.ideas = this.ideas.filter(idea => idea.id !== id);
            this.saveIdeas();
            this.renderIdeas();
            this.showAlert('Idea deleted successfully', 'success');
        }
    }

    renderIdeas() {
        const container = document.getElementById('ideasContainer');

        if (this.ideas.length === 0) {
            container.innerHTML = '<p class="empty-state">No ideas saved yet. Start by adding your first idea above!</p>';
            return;
        }

        // Sort ideas by most recent first
        const sortedIdeas = [...this.ideas].reverse();

        container.innerHTML = sortedIdeas.map(idea => this.createIdeaCard(idea)).join('');

        // Add event listeners to delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.deleteIdea(id);
            });
        });
    }

    createIdeaCard(idea) {
        return `
            <div class="idea-card">
                <div class="idea-header">
                    <div class="idea-title">Idea #${this.ideas.length - this.ideas.indexOf(idea)}</div>
                    <div class="idea-timestamp">${idea.createdAt}</div>
                </div>
                
                <div class="idea-problem">
                    <h4>Problem Statement</h4>
                    <p>${this.escapeHtml(idea.problem)}</p>
                </div>

                <div class="feedback-container">
                    ${idea.stakeholders.map((stakeholder, index) => `
                        <div class="feedback-item">
                            <h5>Stakeholder ${index + 1}</h5>
                            <div class="feedback-text">
                                <strong>Does this problem resonate with them?</strong><br>
                                ${this.escapeHtml(stakeholder.resonate)}
                            </div>
                            <div class="feedback-text">
                                <strong>What aspects do they think matter most?</strong><br>
                                ${this.escapeHtml(stakeholder.aspects)}
                            </div>
                            <div class="feedback-text">
                                <strong>What questions or concerns come to mind?</strong><br>
                                ${this.escapeHtml(stakeholder.concerns)}
                            </div>
                            <div class="feedback-text">
                                <strong>What are you missing about this problem?</strong><br>
                                ${this.escapeHtml(stakeholder.missing)}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="idea-actions">
                    <button class="btn btn-danger btn-delete" data-id="${idea.id}">🗑️ Delete</button>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;

        // Insert at the top of the ideas section
        const ideasSection = document.querySelector('.ideas-section');
        ideasSection.insertBefore(alertDiv, ideasSection.querySelector('h2').nextElementSibling);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackCollector();
});
