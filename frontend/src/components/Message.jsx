import React, { useContext, useState } from 'react';
import API_Database from '../apis/database';
import { Context } from '../config/Context';

const Message = ({value}) => {
    const key = value.id;
    const { user } = useContext(Context);
    const [likeCount, setLikeCount] = useState(value.likeId===''? 0 : value.likeId.split(',').length);
    const [haveLike, setHaveLike] = useState(value.likeId.split(',').find((v=> v === ""+user.id))?true:false);

    const style = {
        message:{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 15px 0 15px',
            width: 'fit-content'
        },
        name:{
            marginLeft: '15px',
            fontWeight: 'bolder',
            textDecoration: 'underline'
        },
        date:{
            display: 'flex',
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
            display: 'flex',
            with: '15px',
            height: '15px',
            margin: '5px',
            img:{
                transform: 'rotate(180deg)'
            },
            img2:{
                transform: 'rotate(0deg)'
            }
        },like:{
            display: 'none',
        }
    },
    
    like = ()=>{
        API_Database.like(value.id, ()=>{});
        setHaveLike(!haveLike);
        setLikeCount(likeCount+(!haveLike?+1:-1));
    }

    let date =  new Date(value.date);

    return (
        <div className='message' style={style.message}>
            <div>
                <p style={style.name}>{value.user_name}</p>
                <p style={style.date}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()} à {date.getHours()}:{date.getMinutes()}</p>
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
            </div>
        </div>
    );
};

export default Message;