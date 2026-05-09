function checkAccess() {
    const code = document.getElementById('access-code').value;
    const error = document.getElementById('login-error');
    
    // We check the password and use it to find the secret file
    // Password is set by user
    if (code === 'Sabnuryasmin12@') {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('dashboard-content').style.display = 'flex';
        loadPrivateLeads(code);
    } else {
        error.style.display = 'block';
    }
}

async function loadPrivateLeads(password) {
    const vaultFile = `leads_vault_${password}.json`;
    console.log("Fetching vault:", vaultFile);
    
    try {
        const response = await fetch(vaultFile);
        if (!response.ok) throw new Error("Vault not found");
        
        const leads = await response.json();
        renderLeads(leads);
    } catch (err) {
        console.warn("No private leads found or incorrect vault file.");
        // Fallback to default example if no leads yet
    }
}

function renderLeads(leads) {
    const container = document.getElementById('leads-container');
    container.innerHTML = ''; // Clear existing
    
    leads.forEach(lead => {
        const item = document.createElement('div');
        item.className = "lead-item";
        item.onclick = () => selectLead(lead['Business Name'], lead['Mockup Link']);
        item.innerHTML = `
            <div class="lead-info">
                <h4>${lead['Business Name']}</h4>
                <p><i class="fas fa-map-marker-alt"></i> Bhubaneswar | <i class="fas fa-link"></i> ${lead['Contact Status']}</p>
            </div>
            <span class="status-badge status-new">Live</span>
        `;
        container.appendChild(item);
    });
}

function selectLead(name, customLink) {
    document.getElementById('no-selection').style.display = 'none';
    document.getElementById('lead-details').style.display = 'block';
    document.getElementById('selected-name').innerText = name;
    
    const domain = "seeyournewsite.online";
    const previewLink = customLink || `https://${domain}/jewelry_mockup.html`;
    
    const pitch = `Hi ${name}, I saw your business on Google and loved your collection, but noticed your website doesn't show off your premium quality. I’ve already built a modern, mobile-ready version for you here: ${previewLink}. Let me know if you'd like to go live!`;
    document.getElementById('pitch-text').innerText = pitch;

    // Update mockup link
    document.querySelector('.btn-preview').onclick = () => window.open(previewLink, '_blank');

    const img = document.querySelector('.preview-thumbnail img');
    img.src = "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800";
}

// ... rest of your functions (startScouting, etc.)
function startScouting() {
    const niche = document.getElementById('niche').value;
    const loc = document.getElementById('location').value;
    if(!niche || !loc) { alert("Please enter niche and location"); return; }
    const status = document.getElementById('scout-status');
    const progContainer = document.getElementById('progress-container');
    const progBar = document.getElementById('progress-bar');
    status.innerText = "Agent Scouting...";
    status.style.color = "#00d2ff";
    progContainer.style.display = "block";
    progBar.style.width = "0%";
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if(progress >= 100) { progress = 100; clearInterval(interval); finalizeScouting(niche, loc); }
        progBar.style.width = progress + "%";
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
    newLead.innerHTML = `<div class="lead-info"><h4>${leadName}</h4><p><i class="fas fa-map-marker-alt"></i> ${loc} | <i class="fas fa-link"></i> New Prospect</p></div><span class="status-badge status-new">Analysis Ready</span>`;
    container.prepend(newLead);
    status.innerText = "1 New Lead Found";
    status.style.color = "#00ff7f";
    setTimeout(() => { progContainer.style.display = "none"; }, 1000);
}

function copyPitch() {
    const text = document.getElementById('pitch-text').innerText;
    navigator.clipboard.writeText(text);
    const btn = document.querySelector('.btn-action.primary');
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    setTimeout(() => btn.innerText = originalText, 2000);
}
