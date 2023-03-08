import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { AddFolder } from "./features/AddFolder";
import { EditUser } from "./features/EditUser";
import { CardsList } from "./features/CardsList";
import { FoldersList } from "./features/FoldersList";
import { Layout, Menu } from "antd";
import { AddCard } from "./features/AddCard";
import {VideoPlayedHistory} from "./features/history";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const items = [
    {
      label: <Link to="/">Cards</Link>,
      key: "cards",
    },
    {
      label: <Link to="/video-history">History</Link>,
      key: "history",
    },
  ];
  return (
    <Router>
      <Layout className="layout">
        <Header className="padding-0">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["cards"]}
            items={items}
          />
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div className="site-layout-content">
            <div>
              <Switch>
                <Route path="/folder/:folderId/addCard">
                  <AddCard />
                </Route>
                <Route path="/folder/:folderId/cards/:cardId">
                  <AddCard />
                </Route>
                <Route path="/folder/:folderId/cards">
                  <CardsList />
                </Route>
                <Route path="/add-folder">
                  <AddFolder />
                </Route>
                <Route path="/video-history">
                  <VideoPlayedHistory />
                </Route>
                <Route path="/folder/:folderId">
                  <AddFolder />
                </Route>
                <Route path="/edit-user">
                  <EditUser />
                </Route>

                <Route path="/">
                  <FoldersList />
                </Route>
              </Switch>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};
export default App;
