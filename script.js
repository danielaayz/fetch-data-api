// Funktion som hämtar ett råd från API:t baserat på ett specifikt id
const fetchAdviceById = (id) => {
   fetch(`https://api.adviceslip.com/advice/${id}`)
      .then((res) => {
         if (!res.ok) {
            throw new Error("Network response was not ok");
         }
         return res.json();
      })
      .then((data) => {
         const advice = data.slip.advice;
         console.log(`Advice (ID:${id}): ${advice}`);
      })
      .catch((err) => {
         console.error("Error fetching advice", err);
      });
};

// Funktion som hämtar en slumpmässig Chuck Norris-vits från API:t
const randomChuckJoke = () => {
   fetch(`https://api.chucknorris.io/jokes/random`)
      .then((res) => {
         if (!res.ok) {
            throw new Error("Network response was not ok");
         }
         return res.json();
      })
      .then((data) => {
         const joke = data.value;
         console.log(`Chuck Norris Joke: ${joke}`);
      })
      .catch((err) => {
         console.error("Error fetching joke", err);
      });
};

// En asynkron funktion som returnerar en promise
function coinFlip(fetchAdviceById) {
   return new Promise((resolve, reject) => {
      let result = Math.random();

      // Om resultatet är större än 0.5, anse att det är vinst
      if (result > 0.5) {
         resolve("You win!");
         const randomId = Math.floor(Math.random() * 200) + 1;
         fetchAdviceById(randomId);
      } else {
         randomChuckJoke(); // Hämta en Chuck Norris-joke
         reject("You lose, but here is a Chuck Norris joke!");
      }
   });
}

// Anropar coinFlip-funktionen och hanterar resultatet
coinFlip(fetchAdviceById)
   .then((message) => {
      console.log(message); // "You win!"
   })
   .catch((error) => {
      console.log(error); // "You lose!"
   });
