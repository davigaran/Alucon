// SPA Routing Logic
function switchView(viewId, navElement) {
    // 1. Hide all views
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => view.classList.add('hidden'));

    // 2. Show selected view
    const selectedView = document.getElementById('view-' + viewId);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }

    // 3. Handle Navigation Sidebar states
    const mainSidebar = document.getElementById('main-sidebar');
    const publishSidebar = document.getElementById('publish-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');

    if (viewId === 'publish') {
        mainSidebar.classList.add('hidden');
        publishSidebar.classList.remove('hidden');
        rightSidebar.classList.add('hidden'); // Hide Avisos on publish
    } else {
        publishSidebar.classList.add('hidden');
        mainSidebar.classList.remove('hidden');
        
        // Update active state in main nav
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        if (navElement && navElement.tagName === 'LI') {
            navElement.classList.add('active');
        } else {
            // Fallback for programmatic calls (e.g., cancel button)
            const fallbackLi = Array.from(document.querySelectorAll('.nav-links li')).find(li => 
                li.textContent.trim().toLowerCase().includes(viewId === 'home' ? 'inicio' : viewId)
            );
            if (fallbackLi) fallbackLi.classList.add('active');
        }

        // Handle Right Sidebar visibility
        if (viewId === 'chat' || viewId === 'settings') {
            rightSidebar.classList.add('hidden');
        } else {
            rightSidebar.classList.remove('hidden');
        }
    }

    // 4. Adjust layout grid if needed (Chat has a different internal layout, settings has no right sidebar)
    const appContainer = document.querySelector('.app-container');
    if (viewId === 'chat') {
        appContainer.style.gridTemplateColumns = '240px 1fr'; // Chat handles its own right sidebar
    } else if (viewId === 'publish') {
        appContainer.style.gridTemplateColumns = '240px 1fr'; // No right sidebar
    } else if (viewId === 'settings') {
        appContainer.style.gridTemplateColumns = '240px 1fr'; // No right sidebar, settings expands
    } else {
        appContainer.style.gridTemplateColumns = '240px 1fr 320px'; // Standard 3-column layout
    }
}

// Chat Tabs Logic
document.addEventListener('DOMContentLoaded', () => {
    const chatTabs = document.querySelectorAll('.chat-tabs button');
    chatTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            chatTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            // In a real app, this would filter the list below
        });
    });

    // Settings Menu Logic (Visual only)
    const settingsItems = document.querySelectorAll('.settings-nav-item');
    settingsItems.forEach(item => {
        item.addEventListener('click', () => {
            settingsItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update content based on selection (mocking the title)
            const title = item.querySelector('.font-medium').innerText;
            document.querySelector('.settings-content h3').innerText = title;
        });
    });
});

// Project Modal Logic
function openProjectModal() {
    document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

function editProject(id) {
    // Populate modal fields based on ID
    document.getElementById('modal-title').innerText = 'Editar Proyecto';
    // In a real scenario, fetch project data by ID and fill inputs here
    openProjectModal();
}