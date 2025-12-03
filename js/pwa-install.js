let deferredPrompt;
let installButton;

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }

  createInstallButton();
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installButton) {
    installButton.style.display = 'block';
  }
});

function createInstallButton() {
  const existingButton = document.getElementById('pwa-install-btn');
  if (existingButton) {
    installButton = existingButton;
    return;
  }

  installButton = document.createElement('button');
  installButton.id = 'pwa-install-btn';
  installButton.className = 'install-app-btn';
  installButton.innerHTML = '📱 Install App';
  installButton.style.display = 'none';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.left = '20px';
  installButton.style.zIndex = '9999';
  installButton.style.padding = '12px 24px';
  installButton.style.background = 'linear-gradient(45deg, #00ffff, #0044ff)';
  installButton.style.border = 'none';
  installButton.style.borderRadius = '25px';
  installButton.style.color = 'black';
  installButton.style.fontWeight = 'bold';
  installButton.style.cursor = 'pointer';
  installButton.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
  installButton.style.fontSize = '14px';
  installButton.style.fontFamily = "'Orbitron', sans-serif";

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    deferredPrompt = null;
    installButton.style.display = 'none';
  });

  document.body.appendChild(installButton);
}

window.addEventListener('appinstalled', () => {
  console.log('CyberZilla PWA installed successfully!');
  if (installButton) {
    installButton.style.display = 'none';
  }
  deferredPrompt = null;
});

if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Running as installed PWA');
}
