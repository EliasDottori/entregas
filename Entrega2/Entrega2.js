function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar 10,000 números aleatorios en un rango de 1 a 20
const randomNumbers = [];
for (let i = 0; i < 10000; i++) {
  const randomNumber = getRandomNumber(1, 20);
  randomNumbers.push(randomNumber);
}

// Inicializar un objeto para realizar el conteo de ocurrencias
const numberCount = {};

// Contar la cantidad de veces que cada número aparece
for (const number of randomNumbers) {
  if (numberCount[number]) {
    numberCount[number] += 1;
  } else {
    numberCount[number] = 1;
  }
}

// Mostrar los resultados por consola
console.log("Resultados:");
for (const number in numberCount) {
  console.log(`Número ${number}: ${numberCount[number]} veces`);
}
