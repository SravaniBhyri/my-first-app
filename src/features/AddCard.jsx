import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { userAdded, userUpdated, userDeleted } from "./cardsSlice";

export function AddCard() {
  const { folderId, cardId } = useParams();
  const dispatch = useDispatch();
  const { entities, folders } = useSelector((state) => state.videoCards);

  const history = useHistory();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleLink = (e) => setLink(e.target.value);
  const handleMoveFolder = (e) => setFolderName(e.target.value);
  const usersAmount = useSelector((state) => state.videoCards.entities.length);

  useEffect(() => {
    if (entities?.length && folderId && cardId) {
      const cards = entities.filter((entity) => entity?.folderId === folderId);
      const videoCard = cards.find((folder) => folder.id === cardId);
      if (videoCard) {
        setName(videoCard.name);
        setLink(videoCard.link);
        setFolderName(videoCard.folderId);
      }
    }
  }, [entities,folderId,cardId]);

  const handleClick = () => {
    if (name && link) {
      if (cardId) {
        if(folderName !== folderId){
          dispatch(userDeleted({ id:cardId }));
          dispatch(
            userAdded({
              id: `card-${usersAmount + 1}`,
              name,
              link,
              folderId: folderName,
            })
          );
        }else{
          dispatch(
            userUpdated({
              id: cardId,
              name,
              link,
              folderId: folderId,
            })
          );
        }
      } else {
        dispatch(
          userAdded({
            id: `card-${usersAmount + 1}`,
            name,
            link,
            folderId: folderId,
          })
        );
      }

      setError(null);
      history.push(`/folder/${folderId}/cards`);
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setLink("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>{cardId ? "Edit" : "Add"} Video Link</h1>
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
          <label htmlFor="linkInput">link</label>
          <input
            className="u-full-width"
            type="text"
            id="linkInput"
            onChange={handleLink}
            value={link}
          />
          {cardId && (
            <>
              <label htmlFor="folder">Folder</label>
              <select
                className="u-full-width"
                onChange={handleMoveFolder}
                value={folderName}
                id="folder"
              >
                {folders.map((folder) => {
                  return <option value={folder.id}>{folder.name}</option>;
                })}
              </select>
            </>
          )}
          {error && error}
          <button onClick={handleClick} className="button-primary">
            {cardId ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
