// utilities/utility.js
class DeviceChecker {
    static init() {
      this.checkDeviceCompatibility();
      window.addEventListener('resize', this.checkDeviceCompatibility);
    }
  
    static checkDeviceCompatibility() {
      const incompatibleMessage = document.getElementById('device-incompatible-message');
      
      if (window.innerWidth < 300) {
        if (!incompatibleMessage) {
          this.createIncompatibleMessage();
        }
        document.body.style.overflow = 'hidden';
      } else {
        if (incompatibleMessage) {
          incompatibleMessage.remove();
        }
        document.body.style.overflow = '';
      }
    }
  
    static createIncompatibleMessage() {
      const messageElement = document.createElement('div');
      messageElement.id = 'device-incompatible-message';
      messageElement.innerHTML = `
        <div class="incompatible-message__content">
          <h2>Device Incompatibility</h2>
          <p>This website is not optimized for devices with screen width less than 300px. Please use a larger device for better experience.</p>
        </div>
      `;
      document.body.appendChild(messageElement);
    }
  }
  
  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    DeviceChecker.init();
  });
  
  export default DeviceChecker;