import textile01 from '../assets/images/textile01.jpeg';
import textile02 from '../assets/images/textile02.jpeg';
import textile03 from '../assets/images/textile03.jpeg';
import textile04 from '../assets/images/textile04.jpeg';

export const sliderData = [
    {
        id: "0",
        img: textile01,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        id: "1",
        img: textile02,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo similique sed hic eum et omnis?!"
    },
    {
        id: "2",
        img: textile03,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        id: "3",
        img: textile04,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo similique sed hic eum et omnis?!"
    },

]

const typesList= [
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
    "Leather"
];

export const fabricData = typesList.map((fabric, index) => {
    return {
        id: (index + 1).toString(),
        img: index % 2 === 0 ? textile01 : textile02, 
        name: `Fabric ${index + 1}`,
        text: "Fashion never stops. There is always the new project, the new opportunity. The important thing is to take your time and not get stressed. I just want to do what I do.",
        type: fabric,
        price: Math.floor(Math.random() * 100) + 1,
    };
});
