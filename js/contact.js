/**
 * ==============================================================================
 * CONTACT & TOAST NOTIFICATION MODULE
 * Real-time form validation, glass toasts, and mock/API submission handler
 * ==============================================================================
 */

// Global Toast Notification Helper
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon-wrap">${icon}</div>
    <div class="toast-message" style="flex: 1; font-weight: 500;">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger smooth slide in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

class ContactManager {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.submitBtn = document.getElementById('contactSubmitBtn');
    this.copyEmailBtn = document.getElementById('copyEmailBtn');
    this.msgInput = document.getElementById('contactMessage');
    this.charCountElem = document.getElementById('charCount');

    this.init();
  }

  init() {
    if (this.form) {
      this.bindFormEvents();
    }

    if (this.copyEmailBtn) {
      this.copyEmailBtn.addEventListener('click', () => {
        const email = 'alex.vance.dev@proton.me';
        navigator.clipboard.writeText(email).then(() => {
          window.showToast('Email address copied to clipboard: ' + email, 'success');
        });
      });
    }

    if (this.msgInput && this.charCountElem) {
      this.msgInput.addEventListener('input', () => {
        const len = this.msgInput.value.length;
        this.charCountElem.textContent = `${len} / 500`;
        if (len > 450) {
          this.charCountElem.style.color = '#ef4444';
        } else {
          this.charCountElem.style.color = 'var(--text-dim)';
        }
      });
    }
  }

  bindFormEvents() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Update button state
      const originalBtnHtml = this.submitBtn.innerHTML;
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/></svg>
        <span>Transmitting...</span>
      `;

      try {
        // Attempt sending to C++ Microservice if running locally
        try {
          await fetch('http://localhost:8081/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
          });
        } catch (err) {
          // If local microservice is offline, gracefully succeed with browser simulation
        }

        // Simulate network delay
        await new Promise(r => setTimeout(r, 800));

        window.showToast(`Thank you, ${name}! Your message has been transmitted successfully.`, 'success');
        this.form.reset();
        if (this.charCountElem) this.charCountElem.textContent = '0 / 500';
      } catch (err) {
        window.showToast('Something went wrong. Please try again.', 'error');
      } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactManager();
});
