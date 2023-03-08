import { Card, Col, Row, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { folderDeleted } from "./cardsSlice";

export const FoldersList = () => {
    const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.videoCards);
  
  const handleDelete = (id) => {
    dispatch(folderDeleted({ id }));
  };

  return (
    <>
    <div className="row">
        <h1>Folders</h1>
      </div>
      {folders && folders?.length ? (
        <>
              <div className="row">
              <div className="two columns">
                <Link to="/add-folder">
                  <button className="button-primary">Add Folder</button>
                </Link>
              </div>
            </div>
        <Row gutter={16}>
          {folders.map((folder,index) => {
            return (
              <Col span={8} key={`${folder?.name}-${index}`}>
                <Card title={folder?.name}
                 extra={<Link to={`/folder/${folder.id}/cards`}>view cards</Link>}
                 actions={[
                    <Link to={`/folder/${folder.id}`}>Edit</Link>,
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" onClick={() => handleDelete(folder.id)}>Delete</a>
                  ]}>
                  {folder?.description}
                </Card>
              </Col>
            );
          })}
        </Row>
        </>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>No Folders Found</span>}
        >
          <Link to="/add-folder">
            <button className="button-primary">Create Now!</button>
          </Link>
        </Empty>
      )}
    </>
  );
};
