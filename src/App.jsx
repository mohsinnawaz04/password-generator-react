import React, { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [length, setlength] = useState(10);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, characterAllowed, setpassword]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div
        id="main"
        className="bg-orange-400 lg:mx-auto pb-5 rounded-lg lg:w-3/6"
      >
        <div>
          <h1 className="text-5xl text-center font-semibold mt-28 py-5">
            Password Generator
          </h1>
        </div>
        <div className="lg:w-7/12 px-1 lg:px-0 mx-auto flex  mt-10">
          <input
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
            className="py-3 px-2  outline-none w-5/6 rounded-l bg-orange-200 text-xl lg:text-2xl"
          />
          <button
            className="bg-red-500 py-3 px-4 rounded-r hover:bg-red-600 text-white"
            onClick={copyPasswordToClipboard}
          >
            COPY
          </button>
        </div>
        <div className="lg:w-3/6 mx-auto my-5 text-center">
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
            className="w-6/12 cursor-pointer lg:w-5/12"
          />
        </div>
        <div className="flex lg:w-3/6 flex-wrap mx-auto justify-around text-xl">
          <div>
            <input
              type="checkbox"
              className="scale-150 mr-2 cursor-pointer"
              id="number"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="cursor-pointer select-none">
              Numbers
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="scale-150 mr-2 cursor-pointer "
              id="characters"
              onChange={() => {
                setcharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characters" className="cursor-pointer select-none">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
