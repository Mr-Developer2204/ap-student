import "./style.css";
import { Layout, Row, Tabs, Col, Modal, Typography, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory, BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/user'
import { QueryCard } from '../../../containers';

var tabkey = 0;
const { TabPane } = Tabs;


export default function MyQueries() {
  const [user, setUser] = useContext(UserContext);
  const userData = JSON.parse(user);
  const history = useHistory();
  const [QueryList, setQueryList] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {


    var config = {
      method: 'get',
      url: `https://m3j6kmp129.execute-api.us-east-1.amazonaws.com/d1/studentqueries?email=${userData['email']}`,
      headers: {
        'email': userData['email'],
        'Authorization': sessionStorage.getItem('id_token') ? sessionStorage.getItem('id_token') : '',
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response)
        setQueryList(response.data.response.queries)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])
  const createnewQuery = (
    <Button
      id="createquery"
      type="primary"
      shape="round"
      icon={<PlusCircleOutlined />}
      size="medium"
      onClick={showModal}
    >
      Create a Query
    </Button>
  );
  console.log(QueryList);

  return (
    <div className="myquery">
      <BrowserRouter>
        <Layout>
          <Row>

            <Col span={20}>
              <div className="myquery_TopTitle">
                <Typography.Title level={2}>My Queries</Typography.Title>
              </div>
            </Col>

            <Col span={23}>
              <Tabs tabBarExtraContent={createnewQuery}>
                <TabPane tab="All Queries" key={tabkey++}>
                  <Row>
                    <Col span={24}>
                      {QueryList !== undefined ? QueryList.map(data => <QueryCard queryCarddata={data} />) : <div />}
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Solved" key={tabkey++}>
                  <Row>
                    <Col span={24}>
                      {QueryList !== undefined ? QueryList.map(data => data.querystatus.status ? <QueryCard queryCarddata={data} /> : <div />) : <div />}
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Pending" key={tabkey++}>
                  <Row>
                    <Col span={24}>
                      {QueryList !== undefined ? QueryList.map(data => data.querystatus.status ? null : <QueryCard queryCarddata={data} />) : <div />}
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Layout>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </BrowserRouter>
    </div>
  );
}
