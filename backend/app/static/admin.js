// Wiwekaitech Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check auth status on page load
    checkAuthStatus();
});

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/v1/admin/me');
        if (response.status === 401) {
            // Not authenticated, redirect to login
            if (!window.location.pathname.includes('/admin/login')) {
                window.location.href = '/admin/login';
            }
        }
    } catch (error) {
        console.error('Auth check failed:', error);
    }
}

// Generic API call helper
async function apiCall(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.detail || 'API Error');
        }
        
        return result;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Show toast message
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Confirm delete action
function confirmDelete(itemName) {
    return confirm(`Are you sure you want to delete this ${itemName}?`);
}

// Handle logout
async function handleLogout() {
    try {
        await fetch('/api/v1/admin/logout', { method: 'POST' });
        window.location.href = '/admin/login';
    } catch (error) {
        console.error('Logout failed:', error);
        showToast('Logout failed', 'error');
    }
}

// Export functions
window.apiCall = apiCall;
window.showToast = showToast;
window.confirmDelete = confirmDelete;
window.handleLogout = handleLogout;
