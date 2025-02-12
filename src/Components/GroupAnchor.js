import React from 'react';
import {Row,Col} from 'antd';
import AnchorLink from 'react-anchor-link-smooth-scroll'

const GroupAnchor = ({GroupList}) => {
    return(
        <>
        <Row wrap={false} style={{overflowY:'scroll',background:"white",padding:"5px 10px"}}>
            {GroupList.map((item,idx)=>{
                return(
                    <>
                        <Col style={{overflow:'visible', margin:'0pc 5px'}}>
                            <div style={{padding:'5px 10px',backgroundColor:'#cccccc',borderRadius:'10%'}}>
                                <AnchorLink offset='45px' href={"#"+item.name} style={{color:'black',textDecoration:'none'}}>{item.name}</AnchorLink>
                            </div>
                        </Col>
                    </>
                )
            })}
        </Row>

        </>
    )
}

export default GroupAnchor;