import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { BellOutlined } from '@ant-design/icons';
import { Dropdown, Menu , Badge } from 'antd';
/*
const NotificationsPage1 = () => {
    const [notifications, setNotifications] = useState([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
    axios.get('http:/localhost:8080/api/notification')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
    }, []);
    const handleVisibleChange = (flag) => {
    setVisible(flag);
    };
    const menu = (
    <Menu>
      {notifications.map(notification => (
        <Menu.Item key={notification.id}>
          {notification.type === 'booking'
            ? `${notification.user.id} đã đặt thuê ${notification.forrent.namehouse} vào ngày ${notification.date}`
            : `${notification.user.id} đã hủy thuê ${notification.forrent.namehouse} vào ngày ${notification.date}`}
        </Menu.Item>
      ))}
    </Menu>
    );
     return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
    >
      <Badge count={notifications.length}>
        <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Badge>
    </Dropdown>
    );
};
*/
const NotificationsPage = ({ landlordId }) => {
    const [notifications, setNotifications] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/notification/${landlordId}`)
            .then(response => setNotifications(response.data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, [landlordId]);

    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };

    const menu = (
        <Menu>
            {notifications.map(notification => (
                <Menu.Item key={notification.id}>
                    {notification.type === 'booking'
                        ? `${notification.userId} đã đặt thuê ${notification.houseName} vào ngày ${new Date(notification.timestamp).toLocaleDateString()}`
                        : `${notification.userId} đã hủy thuê ${notification.houseName} vào ngày ${new Date(notification.timestamp).toLocaleDateString()}`}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div>
            <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={visible}
                trigger={['click']}
            >
                <Badge count={notifications.length}>
                    <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                </Badge>
            </Dropdown>
        </div>
    );
};
export default NotificationsPage;