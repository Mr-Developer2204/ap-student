/**
 * renders out the card that will have ->
 *              TITLE , SUBTITLE (e.g 2 in progress | 3 completed), NEXT BUTTON 
 * This Component is being utilised by the dashboard component.
 * 
 * Written By: Tejas ladhani
 */
import './style.css';
import { Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function DashBoardCard({ title, subSpan }) {
    return (
        <div className="SDashboard_Card">
            <div className="SDashboard_Card_Title">
                <Typography.Title level={4}>{title}</Typography.Title>
            </div>
            <div className="SDashboard_Card_Body">
                <div className="SDashboard_Card_Bodytext">
                    <Typography.Text>
                        {subSpan.map((item) => <span>{item + " | "}</span>)}
                    </Typography.Text>
                </div>
                <div className="SDashboard_Card_BodySymbol">
                    <ArrowRightOutlined />
                </div>

            </div>

        </div>

    )
}
