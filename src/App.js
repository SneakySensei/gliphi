import "./App.css";
import styled from "styled-components";
import shuffleSeed from "shuffle-seed";

import background from "./assets/bg.jpg";
import { useEffect, useState } from "react";

const Title = styled.h1`
  text-align: center;
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.4rem;
  color: #6b1839;
  font-size: 28pt;
  animation: title 0.8s ease-out, shine 1.5s 0.7s forwards, flicker 3s infinite;
  position: relative;
  span {
    animation: shine 1.5s 0.7s forwards, blink 10s 1.7s infinite;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  overflow: auto;
  background-color: #111;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    content: "";
    filter: brightness(0.5);
    background: url("${background}") no-repeat right center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;
const SeedInput = styled.div`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  background-color: #55555530;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  padding: 1rem 1rem;
  margin-bottom: 0.5rem;
  input {
    font-size: 12pt;
    background-color: #2f2f2f80;
    outline: none;
    border: none;
    color: white;
    padding: 0.5rem;
    font-size: 12pt;
    border-radius: 0.3rem;

    &:focus,
    &:active {
      outline: none;
    }
  }
  span {
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;
const View = styled.div`
  position: relative;
  color: #eee;
  max-width: 1024px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: stretch;
  width: 100%;
  padding: 0 1rem 2rem 1rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .card {
    flex: 1;
    padding: 2rem 2rem 3rem 2rem;
    background-color: #55555530;
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 1.2rem 1rem;
    }

    div {
      font-weight: bold;
      margin: 0 0 0.5rem 1rem;
      font-family: "Orbitron";
    }
  }

  textarea {
    resize: none;
    width: 100%;
    flex: 1;
    background-color: #2f2f2f80;
    outline: none;
    border: none;
    color: white;
    padding: 1rem;
    font-size: 12pt;
    border-radius: 0.3rem;

    &:focus,
    &:active {
      outline: none;
    }
  }
`;

const symbols = [
  "+",
  "-",
  "*",
  "/",
  "<",
  ">",
  ";",
  ":",
  "»",
  "«",
  "=",
  "&",
  "^",
  "%",
  "$",
  "#",
  "@",
  "|",
  "~",
  "Ω",
  "δ",
  "∞",
  "φ",
  "ε",
  "∩",
  "≡",
  "÷",
  "≈",
  "α",
  "√",
  "Θ",
  "Φ",
  "τ",
  "µ",
  "σ",
  "Σ",
  "π",
  "Γ",
  "ß",
  " ",
];

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "!",
  "?",
  " ",
];

function generateMap(seed) {
  var randomisedLetters = shuffleSeed.shuffle(letters, seed);
  var map = {};
  randomisedLetters.forEach((letter, index) => {
    map[letter] = symbols[index];
  });
  return map;
}

function encrypt(msg, map) {
  msg = msg.toUpperCase();
  var encrypted = "";
  for (var i = 0; i < msg.length; i++) {
    if (!(msg.charAt(i) in map))
      return "Error!! Invalid characters in message!";
    encrypted += map[msg.charAt(i)];
  }
  return encrypted;
}

function decrypt(code, map) {
  var decrypted = "";
  for (var i = 0; i < code.length; i++) {
    // if (!(msg.charAt(i) in map))
    //   return "Error!! Invalid characters in message!";
    decrypted += Object.keys(map)[Object.values(map).indexOf(code.charAt(i))];
  }
  return decrypted;
}

function App() {
  const [seed, setSeed] = useState(
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5)
  );

  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const [map, setMap] = useState({});
  useEffect(() => {
    setMap(generateMap(seed));
  }, [seed]);

  const handleSeedInput = (evt) => {
    if (evt.target.value.length == 0) {
      setSeed(
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5)
      );
    } else setSeed(evt.target.value);
  };

  const handleMessageInput = (evt) => {
    setMessage(evt.target.value);
    setCode(encrypt(evt.target.value, map));
  };

  const handleCodeInput = (evt) => {
    setCode(evt.target.value);
    setMessage(decrypt(evt.target.value, map));
  };

  return (
    <Container>
      <Title>
        Gliph<span>i</span>
      </Title>
      <SeedInput>
        <span>Seed:</span>
        <input
          type="text"
          placeholder="Enter seed"
          value={seed}
          onChange={handleSeedInput}
        />
      </SeedInput>
      <View>
        <div className="card">
          <div>English</div>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageInput}
          ></textarea>
        </div>
        <div className="card">
          <div>Symbolic</div>
          <textarea
            placeholder="Enter symbolic code"
            value={code}
            onChange={handleCodeInput}
          ></textarea>
        </div>
      </View>
    </Container>
  );
}

export default App;
