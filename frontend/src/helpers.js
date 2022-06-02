//array courses
export const coursesArr = [
  { id: 1, name: "Wiskunde" },
  { id: 2, name: "Nederlands" },
  { id: 3, name: "Frans" },
  { id: 4, name: "Lichamelijke-Opvoeding" },
  { id: 5, name: "Biologie" },
  { id: 6, name: "Fysica" },
  { id: 7, name: "Plastische-Opvoeding" },
  { id: 8, name: "Aardrijkskunde" },
  { id: 9, name: "Chemie" },
];

//average courses
export const average = (obj) => {
  return (
    Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0) /
    Object.keys(obj).length
  );
};

// score colorClass
export const colorClass = (nr) => {
  if (nr < 50) {
    return "red";
  } else if (nr >= 50 && nr <= 60) {
    return "orange";
  } else {
    return "green";
  }
};

//find id based on value
const findId = (value) => {};
