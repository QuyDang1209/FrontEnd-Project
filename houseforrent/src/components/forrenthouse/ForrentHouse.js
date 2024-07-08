import React, { useEffect, useState } from 'react'
import { imgUpload } from './ConfigImg'
import { uploadBytes, ref, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export default function ForrentHouse() {
    const [img, setImg] = useState([])
    const [imgUrl, setImgUrl] = useState([])
    const handleClick = () => {
        for(let i = 0; i < img.length; i++) {
            const imgRef = ref(imgUpload, `file/${v4()}`)
            uploadBytes(imgRef,img[i]).then((value)=>{
                getDownloadURL(value.ref).then(url => {
                                setImgUrl(data => [...data, url])
                            })
            });
            
        }
    }
    console.log(img, "iiiiiiiiiiiiiiii");
    
    console.log(imgUrl, "link anh day");
  return (
    <>
    <input type="file" multiple="multiple" id="imgUpload" onChange={e => setImg(e.target.files)} />
    <button onClick={handleClick}>Upload</button>
    </>
  )
}
