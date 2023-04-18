import logo from './logo.svg';
import { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import ToastEditor from './ToastEditor';
import AudioPlayer from 'react-h5-audio-player';
import Message from './message/Message';
import Message2 from './message/Message2';
import AudioWaveSurfer from './Wave/AutdioWaveSurfer'
function App() {
  // const [data,setData] = useState('')
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/insertmusic/24`,)
  //       .then(response => {
  //           setData(response.data.listMovie)
  //       })
  //       .catch(error => console.log(error));
  // }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    console.log(formData)
    axios({
      method: 'POST',
      url: `http://localhost:8080/api/insertmusic`,
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: formData
    }).then(() => {
      console.log("aaaaaaaaaaaaaaaaaaaa");
    }).catch(() => {
      alert(`업로드 중 오류가 발생했습니다.`);
    });
  }
  return (
    <>
      {/* <form onSubmit={(e) => onSubmit(e)}>

        <input
          type="file"
          name="profile_files"
          multiple="multiple"
        />
        <button type="submit">제출</button>


      </form>
      <AudioPlayer
        src={'http://localhost:8080/api/insertmusic/521bc21a-f50a-4b23-964b-a66f743e164f'}
        // showDownloadProgress={true}
        autoPlay={false}
        volume={0.3}
      />
      <ToastEditor/> */}
      {/* <Message></Message>
      <br></br>
      <br></br>
      <br></br>

      <hr></hr>
      <br></br>
      <br></br>
      <br></br>
      <Message2></Message2> */}
      <AudioWaveSurfer></AudioWaveSurfer>

    </>
  );
}

export default App;

