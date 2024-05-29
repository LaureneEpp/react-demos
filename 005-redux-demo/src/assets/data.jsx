import textile01 from "../assets/images/textile01.jpeg";
import textile02 from "../assets/images/textile02.jpeg";
import textile03 from "../assets/images/textile03.jpeg";
import textile04 from "../assets/images/textile04.jpeg";
import person01 from "../assets/images/person01.jpeg";
import person02 from "../assets/images/person02.jpeg";
import person03 from "../assets/images/person03.jpeg";
import person04 from "../assets/images/person04.jpeg";

export const typesList = [
  "Cotton",
  "Linen",
  "Silk",
  "Wool",
  "Polyester",
  "Rayon",
  "Nylon",
  "Spandex",
  "Velvet",
  "Denim",
  "Flannel",
  "Satin",
  "Chiffon",
  "Taffeta",
  "Tweed",
  "Leather",
];
export const colorsList = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "cyan",
  "magenta",
  "pink",
  "teal",
  "brown",
  "gray",
  "black",
  "white",
];

export const sliderData = [
  {
    id: "0",
    img: textile01,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: "1",
    img: textile02,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo similique sed hic eum et omnis?!",
  },
  {
    id: "2",
    img: textile03,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: "3",
    img: textile04,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo similique sed hic eum et omnis?!",
  },
];

export const fabricData = [];
const sum = 40;

for (let i = 0; i < sum; i++) {
  const typeIndex = i % typesList.length;
  const type = typesList[typeIndex];
  const colorIndex = i % colorsList.length;
  const color = colorsList[colorIndex];

  const fabricItem = {
    id: (i + 1).toString(),
    img: i % 2 === 0 ? textile01 : textile02,
    name: `Fabric ${i + 1}`,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, explicabo pariatur excepturi molestias eos corporis perferendis?",
    type: type,
    color: color,
    price: Math.floor(Math.random() * 100) + 1,
  };

  fabricData.push(fabricItem);
}

export const userData = [];
const images = [person01, person02, person03, person04];

for (let i = 0; i < 4; i++) {
  const user = {
    id: (i + 1).toString(),
    img: images[i],
    fullname: `JohnDoe${i + 1}`,
    password: "P@ss1",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, architecto rerum. Nulla dignissimos voluptate doloribus possimus deserunt suscipit quos enim error, odit distinctio vitae nostrum asperiores. Voluptates, numquam? Dolorum, aperiam.",
  };
  userData.push(user);
}
