import { useEffect, useState } from "react";
import { SubspaceClient, Identity } from "@subspace/subspace";
import "./App.css";

const NODE_WS_PROVIDER = process.env.REACT_APP_NODE_WS_PROVIDER;
const FARMER_WS_PROVIDER = process.env.REACT_APP_FARMER_WS_PROVIDER;

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [subspaceClient, setSubspaceClient] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [object, setObject] = useState(null);
  const [message, setMessage] = useState(null);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    Identity.fromWeb3()
      .then((identity) => {
        setIdentity(identity);
      })
      .catch((error) => {
        setMessage(error);
      });
  }, []);

  useEffect(() => {
    try {
      if (identity) {
        SubspaceClient.connect(
          identity,
          NODE_WS_PROVIDER,
          FARMER_WS_PROVIDER
        ).then((subspaceClient) => {
          setSubspaceClient(subspaceClient);
          setSelectedAccount(identity.getKeyringPair().address);
        });
      }
    } catch (error) {
      setMessage(error);
    }
  }, [identity]);

  const onChange = (address) => {
    setSelectedAccount(address);
  };

  const loadFile = (file) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const value = new Uint8Array(reader.result);
        setFileData(value);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Please, note: Archivation takes 100-120 blocks to complete, the object is not retrievable right away
  const getObject = async () => {
    try {
      const object = await subspaceClient.getObject(objectId);
      setObject(object);
    } catch (e) {
      setMessage(e);
    }
  };

  const putObject = async () => {
    try {
      const objectId = await subspaceClient.putObject(fileData);
      setObjectId(objectId);
    } catch (e) {
      setMessage(e);
    }
  };

  return (
    <div className="App">
      <h1>Subspace.js dapp example</h1>
      <p>{message && " " + message}</p>
      <hr />
      <h2>1. Select an account.</h2>
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
                    {account && getLabel(account)}
                  </option>
                );
              })}
        </select>
      </h3>
      <h3> {selectedAccount && "Selected account: " + selectedAccount}</h3>
      <hr />
      <h2>2. Load a file.</h2>
      <h3>
        <input
          type="file"
          id="file"
          accept="image/*"
          disabled={!selectedAccount}
          onChange={(e) => {
            if (e.target.files[0].type.includes("image/")) {
              if (e.target.files && e.target.files.length > 0) {
                loadFile(e.target.files[0]);
              }
            } else {
              setMessage("Please use an image file for this demo.");
            }
          }}
        ></input>
      </h3>
      <h3>
        {fileData && (
          <img
            src={`data:image/*;base64,${Buffer.from(fileData).toString(
              "base64"
            )}`}
          ></img>
        )}
      </h3>
      <hr />
      <h2>3. Put a file.</h2>
      <h3>
        <button disabled={!fileData} onClick={() => putObject()}>
          Submit putObject
        </button>
      </h3>
      <h3> {objectId && "Object Id: " + objectId}</h3>
      <hr />
      <h2>4. Get the file.</h2>
      <h3>
        <button disabled={!objectId} onClick={() => getObject()}>
          Submit getObject
        </button>
      </h3>
      <p>{message && " " + message}</p>
      <h3>
        {object && (
          <img
            src={`data:image/*;base64,${Buffer.from(object).toString(
              "base64"
            )}`}
          ></img>
        )}
      </h3>
    </div>
  );
}

const getLabel = ({ address, meta }) => {
  return meta.name.toUpperCase() + " | " + address;
};

export default App;
