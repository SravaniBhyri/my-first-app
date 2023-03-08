import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { folderAdded, fodlerUpdated } from "./cardsSlice";

export function AddFolder() {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { folders } = useSelector((state) => state.videoCards);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if(folders?.length && folderId){
       const folder  = folders.find((folder) => folder.id === folderId);
       if(folder){
        setName(folder.name)
        setDescription(folder.description)
       }
    }
  },[folderId,folders])

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const foldersLength = useSelector((state) => state.videoCards.folders.length);

  const handleClick = () => {
    if (name && description) {
        console.log(folderId,'folderId');
      if (folderId) {

        dispatch(
          fodlerUpdated({
            id: folderId,
            name,
            description,
          })
        );
      } else {
        dispatch(
          folderAdded({
            id: `folder-${foldersLength + 1}`,
            name,
            description,
          })
        );
      }

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setDescription("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>{folderId ? "Edit" : "Add"} Folder</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Description</label>
          <input
            className="u-full-width"
            type="text"
            id="descriptionInput"
            onChange={handleDescription}
            value={description}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            {folderId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
