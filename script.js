class ExperienceTimeline {
    constructor() {
        this.experienceData = [];
        this.companyLogos = {
            'Haptik': 'assets/logos/haptik.png',
            'Johnson Controls': 'assets/logos/johnson-controls.png',
            'Pegasus InfoCorp Pvt. Ltd. (Client side at Johnson Controls Inc)': 'assets/logos/pegasus.png',
            'Rheal Software Pvt. Ltd.': 'assets/logos/rheal.png',
            'Navteq': 'assets/logos/navteq.png'
        };
        this.init();
    }

    async init() {
        try {
            await this.loadExperienceData();
            this.renderTimeline();
        } catch (error) {
            console.error('Error loading experience data:', error);
            this.renderErrorMessage();
        }
    }

    async loadExperienceData() {
        const response = await fetch('experience.json');
        if (!response.ok) {
            throw new Error('Failed to load experience data');
        }
        this.experienceData = await response.json();
    }

    parseDate(dateStr) {
        if (!dateStr) return null;
        const [year, month] = dateStr.split('-');
        return new Date(parseInt(year), parseInt(month) - 1, 1);
    }

    formatDate(dateStr) {
        if (!dateStr) return null;
        const [year, month] = dateStr.split('-');
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    calculateDuration(startDate, endDate) {
        const start = this.parseDate(startDate);
        const end = endDate ? this.parseDate(endDate) : new Date();
        
        const yearDiff = end.getFullYear() - start.getFullYear();
        const monthDiff = end.getMonth() - start.getMonth();
        
        let totalMonths = yearDiff * 12 + monthDiff;
        if (totalMonths < 0) totalMonths = 0;
        
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        let duration = '';
        if (years > 0) {
            duration += `${years} yr${years > 1 ? 's' : ''}`;
        }
        if (months > 0) {
            if (duration) duration += ' ';
            duration += `${months} mo${months > 1 ? 's' : ''}`;
        }
        
        return duration || '1 mo';
    }

    groupByCompany() {
        const grouped = {};
        
        this.experienceData.forEach(exp => {
            const companyName = exp.company_name;
            if (!grouped[companyName]) {
                grouped[companyName] = [];
            }
            grouped[companyName].push(exp);
        });
        
        // Sort positions within each company by start date (most recent first)
        Object.keys(grouped).forEach(company => {
            grouped[company].sort((a, b) => {
                const dateA = this.parseDate(a.start_date);
                const dateB = this.parseDate(b.start_date);
                return dateB - dateA;
            });
        });
        
        return grouped;
    }

    getCompanyDuration(positions) {
        const sortedPositions = [...positions].sort((a, b) => {
            const dateA = this.parseDate(a.start_date);
            const dateB = this.parseDate(b.start_date);
            return dateA - dateB;
        });
        
        const earliestStart = sortedPositions[0].start_date;
        const latestEnd = sortedPositions.find(p => !p.end_date) ? null : 
            sortedPositions.reduce((latest, pos) => {
                if (!latest) return pos.end_date;
                return this.parseDate(pos.end_date) > this.parseDate(latest) ? pos.end_date : latest;
            }, null);
        
        return this.calculateDuration(earliestStart, latestEnd);
    }

    getCompanyLogo(companyName) {
        if (this.companyLogos[companyName]) {
            return `<img src="${this.companyLogos[companyName]}" alt="${companyName} logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display:none;">${this.getCompanyInitials(companyName)}</div>`;
        }
        return this.getCompanyInitials(companyName);
    }

    getCompanyInitials(companyName) {
        return companyName
            .split(' ')
            .filter(word => word.length > 0 && !['Pvt.', 'Ltd.', 'Inc', 'Controls', '(Client', 'side', 'at', ')'].includes(word))
            .slice(0, 2)
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');
        const groupedExperience = this.groupByCompany();
        
        let timelineHTML = '';
        
        Object.keys(groupedExperience).forEach(companyName => {
            const positions = groupedExperience[companyName];
            const companyDuration = this.getCompanyDuration(positions);
            
            timelineHTML += `
                <div class="company-group">
                    <div class="company-header">
                        <div class="company-logo">
                            ${this.getCompanyLogo(companyName)}
                        </div>
                        <div class="company-info">
                            <h3>${companyName}</h3>
                            <div class="company-duration">${companyDuration}</div>
                        </div>
                    </div>
                    <div class="positions">
                        ${positions.map(position => this.renderPosition(position)).join('')}
                    </div>
                </div>
            `;
        });
        
        timeline.innerHTML = timelineHTML;
    }

    renderPosition(position) {
        const startFormatted = this.formatDate(position.start_date);
        const endFormatted = position.end_date ? this.formatDate(position.end_date) : 'Present';
        const duration = this.calculateDuration(position.start_date, position.end_date);
        const isCurrent = !position.end_date;
        
        return `
            <div class="position-item ${isCurrent ? 'current' : ''}">
                <div class="position-title">
                    ${position.position}
                    ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
                </div>
                <div class="position-duration">
                    ${startFormatted} - ${endFormatted} · ${duration}
                </div>
                <div class="position-type">Full-time</div>
            </div>
        `;
    }

    renderErrorMessage() {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <p>Unable to load experience data. Please check if experience.json file exists.</p>
            </div>
        `;
    }
}

// Initialize the timeline when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceTimeline();
});

// Company logo management functions
function createCompanyLogoDirectory() {
    // This function would be used to set up the directory structure
    // In a real implementation, you might want to create folders programmatically
    console.log('Create the following directory structure:');
    console.log('assets/');
    console.log('  logos/');
    console.log('    haptik.png');
    console.log('    johnson-controls.png');
    console.log('    pegasus.png');
    console.log('    rheal.png');
    console.log('    navteq.png');
}

// Helper function to update company logos
function updateCompanyLogo(companyName, logoPath) {
    // This function can be used to dynamically update company logos
    const timeline = new ExperienceTimeline();
    timeline.companyLogos[companyName] = logoPath;
    timeline.renderTimeline();
}