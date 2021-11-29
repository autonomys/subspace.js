import { useEffect, useState } from "react";
import { SubspaceClient, Identity } from "subspace.js";
import "./App.css";

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [subspaceClient, setSubspaceClient] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [object, setObject] = useState(null);
  const [message, setMessage] = useState(null);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    try {
      Identity.fromWeb3().then((identity) => {
        setIdentity(identity);
      });
    } catch (error) {
      message = error.message;
    }
  }, []);

  useEffect(() => {
    try {
      if (identity) {
        SubspaceClient.connect(identity).then((subspaceClient) => {
          setSubspaceClient(subspaceClient);
          setSelectedAccount(identity.getKeyringPair().address);
        });
      }
    } catch (error) {
      message = error.message;
    }
  }, [identity]);

  const onChange = (address) => {
    setSelectedAccount(address);
  };

  return (
    <div className="App">
      <h1>Subspace.js dapp example</h1>
      <hr />
      <h2>1. Selec an account.</h2>
      <h3>
        <select id="accounts">
          {identity &&
            identity
              .getKeyring()
              .getPairs()
              .map((account) => {
                return (
                  <option
                    key={account.address}
                    value={account.address}
                    onClick={() => {
                      onChange(account.address);
                    }}
                  >
                    {getLabel(account)}
                  </option>
                );
              })}
        </select>
      </h3>
      <h3>Selected: {selectedAccount && selectedAccount}</h3>
      <hr />
      <h2>2. Load a file.</h2>
      <h3>
        <input
          type="file"
          id="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              let reader = new FileReader();
              reader.onload = () => {
                if (reader.result) {
                  const value = new Uint8Array(reader.result);
                  setFileData(value);
                }
              };
              reader.readAsArrayBuffer(e.target.files[0]);
            }
          }}
        ></input>
      </h3>
      <h3>
        {fileData && (
          <img
            id="ItemPreview"
            src={`data:image/jpg;base64,${Buffer.from(fileData).toString(
              "base64"
            )}`}
          ></img>
        )}
      </h3>
      <hr />
      <h2>3. Put a file.</h2>
      <h3>
        <button
          onClick={async () => {
            const objectId = await subspaceClient.putObject(fileData);
            setObjectId(objectId);
          }}
        >
          Submit putObject
        </button>
      </h3>
      <h3>Object ID:{objectId && objectId}</h3>
      <hr />
      <h2>Step 4. Get the file.</h2>
      <h3>
        <button
          onClick={async () => {
            try {
              const object = await subspaceClient.getObject(objectId);
              const b64 = Buffer.from(object).toString("base64");
              setObject(b64);
            } catch (e) {
              setMessage(e);
            }
          }}
        >
          Submit getObject
        </button>
      </h3>
      <h3>
        {object && (
          <img id="ItemPreview" src={`data:image/jpg;base64,${object}`}></img>
        )}
        {message && " " + message}
      </h3>
    </div>
  );
}

const getLabel = (account) => {
  if (!account) return "";
  return (
    account.meta.name.toUpperCase() + " | " + prettyHash(account.address, 4, 4)
  );
};
const prettyHash = (hash, initSlice, lastsSlice) => {
  return `0x${hash.slice(0, initSlice)}...${hash.slice(
    hash.length - lastsSlice
  )}`;
};
