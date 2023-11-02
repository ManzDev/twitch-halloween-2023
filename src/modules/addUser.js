const hauntedMansion = document.querySelector("haunted-mansion");
const cementeryZone = document.querySelector("cementery-zone");
const skyZone = document.querySelector("sky-zone");

const CHARACTERS = [
  "ghost-user",
  "bat-user"
];

const PLACES = [
  skyZone,
  cementeryZone,
  hauntedMansion
];

export const addUser = ({ username, color }) => {
  const charIndex = ~~(Math.random() * CHARACTERS.length);
  const selectedChar = CHARACTERS[charIndex];
  const user = document.createElement(selectedChar);

  const placeIndex = ~~(Math.random() * PLACES.length);
  const place = PLACES[placeIndex];

  user.setColor(color);
  user.setText(username);
  place.addChar(user); // cementery & skyzone

  console.log("addUser", username, color, place, user);
};
