// This represent the various interactive boxes for the Gym, Spa, Pool and Locker Rooms

//This is the gym box
document.getElementById("gym-info").onclick = function () {
  alert("Gym\n\nThe gym is open every day from 6am to 12pm to all members. All equipment, weights and machines are free for members and their guests to use.");
  return false;
};

// Studio box
document.getElementById("studio-info").onclick = function () {
  alert("Studio\n\nThe studio is free for all members and runs a variety of classes throughout the week. Please ensure the Studio is free if using outside of class times.");
  return false;
};

// Pool & Spa box
document.getElementById("spa-info").onclick = function () {
  alert("Pool & Spa\n\nThe pool and spa are open from 7am to 9pm. The Sauna is set to 90 degrees and the cold plunge is like ice. Please shower before using the pool.");
  return false;
};

// Locker Room box
document.getElementById("locker-info").onclick = function () {
  alert("Locker Room\n\nLockers are free to use during your visit and have a unique code options. Please bring your own padlock if you would feel more comfortable.");
  return false;
};