const BLYNK_AUTH_TOKEN = "yCQ0wCe_auNVGWPioPds5kzVJI9GiWy7";
const BLYNK_URL = "https://blynk.cloud/external/api/";

let marker;

document.getElementById("toggleSwitch").addEventListener("change", function () {
    const state = this.checked ? 1 : 0; // Checkbox ON = 1, OFF = 0
    updateBlynkPin("V0", state);
    console.log(`Manual button state: ${state ? "ON" : "OFF"}`);
});

document.getElementById("toggleSwitch2").addEventListener("change", function () {
    const state = this.checked ? 1 : 0; // Checkbox ON = 1, OFF = 0
    updateBlynkPin("V1", state);
    console.log(`Automatic mode state: ${state ? "Enabled" : "Disabled"}`);
});

// Function to Update Blynk Virtual Pin
async function updateBlynkPin(pin, value) {
    const url = `${BLYNK_URL}update?token=${BLYNK_AUTH_TOKEN}&${pin}=${value}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`Pin ${pin} updated successfully to ${value}`);
        } else {
            console.error(`Failed to update pin ${pin}`);
        }
    } catch (error) {
        console.error("Error updating Blynk pin:", error);
    }
}

async function updateLocation() {
    try {
      // Fetch latitude and longitude from Blynk virtual pins
      const latitude = await fetch(`${BLYNK_URL}get?token=${BLYNK_AUTH_TOKEN}&V2`).then(res => res.text());
      const longitude = await fetch(`${BLYNK_URL}get?token=${BLYNK_AUTH_TOKEN}&V3`).then(res => res.text());
  
      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        console.error("Invalid GPS data received");
        return;
      }
  
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
  
      // Initialize the map and marker if not already defined
      if (!marker) {
        marker = L.marker([lat, lng]).addTo(map);
        map.setView([lat, lng], 15); // Center map on the new coordinates
      } else {
        marker.setLatLng([lat, lng]); // Update marker position
        map.setView([lat, lng]); // Optionally recenter the map
      }
  
      console.log(`Location updated: Latitude ${lat}, Longitude ${lng}`);
    } catch (error) {
      console.error("Failed to update location:", error);
    }
}
  
  // Update location every 10 seconds
  setInterval(updateLocation, 10000);  