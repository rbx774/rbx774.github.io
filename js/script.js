swURL ="./service-worker.js"
// Register the service worker
if ('serviceWorker' in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener('load', async () => {
    // Try to register the service worker.
    try {
      const reg = await navigator.serviceWorker.register(swURL);
      console.log('Service worker registered! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registration failed: ', err);
    }
  });
}

function pageReady() {
    console.log("Hi There ...");
    document.getElementById("language").innerHTML = "language: " + navigator.language;
    document.getElementById("platform").innerHTML = "platform: " + navigator.platform;
    document.getElementById("userAgent").innerHTML = "userAgent: " + navigator.userAgent;
    document.getElementById("vendor").innerHTML = "vendor: " + navigator.vendor;
    document.getElementById("webdriver").innerHTML = "webdriver: " + navigator.webdriver;
    document.getElementById("location").innerHTML = "location: " + getLocation();
}

function getLocation(){
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    var lat = crd.latitude;
    var lng = crd.longitude;
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  return navigator.geolocation.getCurrentPosition(success, error, options);
}