import { userDeleted,videHistoryAdded } from "./cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Empty,Modal } from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export function CardsList() {
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const { entities } = useSelector((state) => state.videoCards);
  const [videoCards, setVideoCards] = useState([]);
  const loading = useSelector((state) => state.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceLink,setSourceLink] = useState('')

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  useEffect(() => {
    if (entities?.length) {
      const cards = entities.filter((entity) => entity?.folderId === folderId);
      setVideoCards(cards);
    }
  }, [entities]);
  const showModal = (link) => {
    setSourceLink(link);
    const time = new Date().toDateString() +' ' + new Date().toLocaleTimeString()
    dispatch(
      videHistoryAdded({link,time,id:time})
    )
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
          <div className="row">
        <h1>Video Cards</h1>
      </div>
      {videoCards && videoCards?.length ? (
        <>
          <div className="row">
            <div className="two columns">
              <Link to={`/folder/${folderId}/addCard`}>
                <button className="button-primary">Add Video Card</button>
              </Link>
            </div>
          </div>
          <Row gutter={16}>
            {videoCards.map((folder,index) => {
              return (
                <Col span={8} key={`${folder?.name}-${index}`}>
                  <Card title={folder?.name}
                  actions={[
                    <Link to={`/folder/${folderId}/cards/${folder.id}`}>Edit</Link>,
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" onClick={() => handleDelete(folder.id)}>Delete</a>
                  ]}>
                   
                     {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" onClick={() => showModal(folder.link)}> {folder?.link}</a>
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
          description={<span>No Video Cards Found</span>}
        >
          <Link to={`/folder/${folderId}/addCard`}>
            <button className="button-primary">Create Now!</button>
          </Link>
        </Empty>
      )}
      {isModalOpen && <PlayVideoModal isModalOpen={isModalOpen} source={sourceLink}  handleCancel={handleCancel}/>}
    </div>
  );
}


export const PlayVideoModal = ({isModalOpen,handleCancel,source}) => {
  // 

  return (
      <Modal title="Video" open={isModalOpen} footer={null}  onCancel={handleCancel}>
     <video width="100%" controls autoPlay={true}>
      <source src={source} type="video/mp4" />
      <source src={source} type="video/ogg" />
      <source src={source} type="video/3gp" />
      <source src={source} type="video/webm" />
    </video>
      </Modal>
  );
};