function selectLead(name) {
    document.getElementById('no-selection').style.display = 'none';
    document.getElementById('lead-details').style.display = 'block';
    document.getElementById('selected-name').innerText = name;
    
    // Update pitch based on name and new domain
    const domain = "seeyournewsite.online";
    const folder = name.toLowerCase().replace(/\s+/g, '-');
    const previewLink = `https://${domain}/jewelry_mockup.html`;
    
    const pitch = `Hi ${name}, I saw your business on Google and loved your collection, but noticed your website doesn't show off your premium quality. I’ve already built a modern, mobile-ready version for you here: ${previewLink}. Let me know if you'd like to go live!`;
    document.getElementById('pitch-text').innerText = pitch;

    // Update mockup image based on niche (simulated)
    const img = document.querySelector('.preview-thumbnail img');
    if(name.toLowerCase().includes('jewelry') || name.toLowerCase().includes('elite')) {
        img.src = "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800";
    } else {
        img.src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800";
    }
}

function startScouting() {
    const niche = document.getElementById('niche').value;
    const loc = document.getElementById('location').value;
    
    if(!niche || !loc) {
        alert("Please enter niche and location");
        return;
    }

    const status = document.getElementById('scout-status');
    const progContainer = document.getElementById('progress-container');
    const progBar = document.getElementById('progress-bar');
    
    status.innerText = "Agent Scouting...";
    status.style.color = "#00d2ff";
    progContainer.style.display = "block";
    progBar.style.width = "0%";

    // Simulate agent working phases
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if(progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finalizeScouting(niche, loc);
        }
        progBar.style.width = progress + "%";
        
        if(progress > 30 && progress < 60) status.innerText = "Analyzing GMB Data...";
        if(progress > 60 && progress < 90) status.innerText = "Generating Mockup...";
    }, 400);
}

function finalizeScouting(niche, loc) {
    const container = document.getElementById('leads-container');
    const status = document.getElementById('scout-status');
    const progContainer = document.getElementById('progress-container');

    const newLead = document.createElement('div');
    newLead.className = "lead-item";
    const leadName = niche + " Elite";
    newLead.onclick = () => selectLead(leadName);
    newLead.innerHTML = `
        <div class="lead-info">
            <h4>${leadName}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${loc} | <i class="fas fa-link"></i> New Prospect</p>
        </div>
        <span class="status-badge status-new">Analysis Ready</span>
    `;
    container.prepend(newLead);
    
    status.innerText = "1 New Lead Found";
    status.style.color = "#00ff7f";
    setTimeout(() => {
        progContainer.style.display = "none";
    }, 1000);
}

function copyPitch() {
    const text = document.getElementById('pitch-text').innerText;
    navigator.clipboard.writeText(text);
    const btn = document.querySelector('.btn-action.primary');
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    setTimeout(() => btn.innerText = originalText, 2000);
}

function openPreview() {
    // Open the jewelry mockup we just created
    window.open('jewelry_mockup.html', '_blank');
}
