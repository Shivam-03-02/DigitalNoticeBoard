document.addEventListener('DOMContentLoaded', function () {
    const slidesIframe = document.createElement('iframe');
    slidesIframe.src = 'https://docs.google.com/presentation/d/e/2PACX-1vT5qxX8FYzM3GaSyfO5Xc2tj3sLZ-9tI0hH5Wz0lFYFP3fuDrpl4fh4S84vUae6/pub?start=false&loop=false&delayms=3000';
    slidesIframe.width = '960';
    slidesIframe.height = '569';
    slidesIframe.allowFullscreen = true;
    
    const widgetContainer = document.getElementById('google-slides-widget');
    widgetContainer.appendChild(slidesIframe);
  });
  