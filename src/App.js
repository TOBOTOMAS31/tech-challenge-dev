import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [peoples, setPeoples] = useState([]);
  const [addPerson, setAddPerson] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://localhost:5000/membres").then((res) => {
      setPeoples(res.data);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/membres", { pseudo: addPerson })
      .then((res) => {
        setAddPerson("");
        getData();
        console.log("Membre bien ajouté !", res);
      })
      .catch((err) => console.log("Erreur lors de l'ajout !", err));
  }

  return (
    <div className="App">
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>
      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form">
          <label htmlFor="name">Nom de l'Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            value={addPerson}
            onChange={(e) => setAddPerson(e.target.value)}
            autoComplete="off"
          />
          {addPerson.length < 3 || addPerson.length > 11 ? (
            <button className="disabled" disabled>
              Envoyer
            </button>
          ) : (
            <button className="active" type="submit" onClick={handleSubmit}>
              Envoyer
            </button>
          )}
        </form>
        <h2>Membres de l'équipage</h2>
        <section className="member-list">
          {peoples.map((person, index) => (
            <div key={index} className="member-item">
              {person.pseudo}
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
