import React, { useContext, useState } from 'react';
import API_Database from '../apis/database';
import { Context } from '../config/Context';
import DefaultProfilePicture from './DefaultProfilePicture';

const Message = ({value}) => {
    const key = value.id;
    const [ _, setLoading] = useState(false);
    const { GetMessages, user } = useContext(Context);
    const [likeCount, setLikeCount] = useState(value.likeId===''? 0 : value.likeId.split(',').length);
    const [haveLike, setHaveLike] = useState(value.likeId.split(',').find((v=> v === ""+user.id))?true:false);

    const style = {
        message:{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 15px 0 15px',
            maxWidth: 'fit-content',
            marginBottom: '40px'
        },
        name :{
            display: "flex",
            width : '100%',
            alignItems: 'center',
            marginBottom: '5px',
            gap : '5px',
            id: {
                color: 'rgb(105, 105, 105)',
                fontSize: '9px'
            },
            label: {
                color : "black"
            },
            marginLeft: '15px',
            fontWeight: 'bolder',
        },
        date:{
            display: 'inline',
            marginLeft: '15px',
            fontSize: '13px',
            color: 'rgb(105, 105, 105)',
        },
        content:{
            display: 'flex',
            flexDirection: 'column',
            wordBreak: 'break-word',
            padding: '8px 15px',
            borderRadius: '15px',
            backgroundColor: 'rgb(205, 205, 205)',
            img:{
                maxWidth: '300px'
            }
        },likeLabel:{
            display: 'inline-flex',
            with: '15px',
            height: '15px',
            margin: '5px',
            img:{
                width: '15px',
                transform: 'rotate(-180deg)',
                transition: 'transform 0.2s ease-in-out',
            },
            img2:{
                width: '15px',
                transform: 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out',
            }
        },like:{
            display: 'none',
        }
    },
    
    like = ()=>{
        API_Database.like(value.id, ()=>{});
        setHaveLike(!haveLike);
        setLikeCount(likeCount+(!haveLike?+1:-1));
    },

    deleteMsg = ()=>{
        API_Database.deletePost(value.id, ()=>{
            GetMessages(setLoading);
        });
    }

    let date =  new Date(value.date);

    return (
        <div className='message' style={style.message}>
            <div style={style.name}>
                <DefaultProfilePicture user={{name: value.user_name, url_picture : value.url_picture}} />
                <span style={style.name.label}>{value.user_name}</span>
                <span style={style.name.id}>{`#${value.user_id}`}</span>
            </div>
            <div style={style.content}>
                {value.content}
                {value.posts_attach!=='undefined' ?
                    <img style={style.content.img} crossOrigin="anonymous" src={API_Database.getImage(value.posts_attach)} alt='post_image'></img> : <></>}
            </div>
            <div>
                <label htmlFor={"like_"+key} style={style.likeLabel}>
                    <img style={haveLike?style.likeLabel.img2:style.likeLabel.img} src='./asset/icon-like.svg' alt='icon-like'/>{likeCount}
                </label>
                <button id={"like_"+key} style={style.like} onClick={()=>{like()}}></button>
                {user.isAdmin ? 
                    <>
                        <label htmlFor="delete" style={style.likeLabel} onClick={()=>{deleteMsg()}}>
                            <img src='./asset/icon-trash-can.svg' alt='icon-trash-can'></img>
                        </label>
                        <button id='delete' style={style.like}/>
                    </> :
                <></>}
                <span style={style.date}>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`}</span>
            </div>
        </div>
    );
};

export default Message;