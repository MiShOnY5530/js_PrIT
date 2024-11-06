class Notification {
    constructor(message) {
        this.message = message;
    }

    show() {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification');
        notificationElement.textContent = this.message;

        const container = document.getElementById('notification-container');
        container.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }
}

class SuccessNotification extends Notification {
    show() {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', 'success');
        notificationElement.textContent = this.message;

        const container = document.getElementById('notification-container');
        container.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }
}

class ErrorNotification extends Notification {
    show() {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', 'error');
        notificationElement.textContent = this.message;

        const container = document.getElementById('notification-container');
        container.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }
}

class InfoNotification extends Notification {
    show() {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', 'info');
        notificationElement.textContent = this.message;

        const container = document.getElementById('notification-container');
        container.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }
}

class WarningNotification extends Notification {
    show() {
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', 'warning');
        notificationElement.textContent = this.message;

        const container = document.getElementById('notification-container');
        container.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.remove();
        }, 3000);
    }
}

class NotificationFactory {
    createNotification(type, message) {
        switch (type) {
            case 'success':
                return new SuccessNotification(message);
            case 'error':
                return new ErrorNotification(message);
            case 'info':
                return new InfoNotification(message);
            case 'warning':
                return new WarningNotification(message);
            default:
                return new Notification(message);
        }
    }
}

function showNotification(type) {
    const factory = new NotificationFactory();
    const notification = factory.createNotification(type, `Це ${type} сповіщення.`);
    notification.show();
}
