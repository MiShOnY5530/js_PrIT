class NotificationManager {
    static instance;

    constructor() {
        if (NotificationManager.instance) {
            return NotificationManager.instance;
        }

        this.notifications = [];
        this.isVisible = false;
        this.notificationTimeout = null;

        NotificationManager.instance = this;
        return this;
    }

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notification-container');

        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerText = message;

        container.appendChild(notification);
        this.notifications.push(notification);

        if (!this.isVisible) {
            this.displayNextNotification();
        }
    }

    displayNextNotification() {
        if (this.notifications.length === 0) return;

        this.isVisible = true;
        const notification = this.notifications.shift();

        notification.classList.remove('hide');
        this.notificationTimeout = setTimeout(() => {
            this.hideNotification(notification);
        }, 3000);
    }

    hideNotification(notification) {
        notification.classList.add('hide');
        notification.remove();
        this.isVisible = false;
        clearTimeout(this.notificationTimeout);

        if (this.notifications.length > 0) {
            this.displayNextNotification();
        }
    }

    getNotificationState() {
        return this.isVisible ? 'Visible' : 'Hidden';
    }
}

function showSuccess() {
    const notificationManager = new NotificationManager();
    notificationManager.showNotification('Повідомлення про успіх!', 'success');
}

function showError() {
    const notificationManager = new NotificationManager();
    notificationManager.showNotification('Повідомлення про помилку!', 'error');
}

function showInfo() {
    const notificationManager = new NotificationManager();
    notificationManager.showNotification('Інформаційне повідомлення!', 'info');
}
