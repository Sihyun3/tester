import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {useEffect,useCallback,useRef, useState } from 'react';
import axios from 'axios';

const ToastEditor = () => {

    const editorRef = useRef(null);
    const [abc ,setAbc] = useState('');
    // todo files data 안에 태그들을 넘겨주는것도 같이 하면 될거 같아요
    


    //추가
 

    // const addImage = async (blob, dropImage) => {
    //     const formData = new FormData(); //폼데이터 형식으로 선언
    //     formData.append('files', blob); //blob안에 들어있는데이터를 formData안에 넣어주는거
    //     console.log(blob)

    //     console.log(formData);
    //     axios({
    //         method: 'POST',
    //         url: `http://localhost:8080/api/insertmusic`,
    //         headers: { 'Content-Type': 'multipart/form-data;' },
    //         data: formData
    //     }).then(() => {
    //         const url = `http://localhost:8080/api/insertmusic/${blob.name}`;
    //         dropImage(url, '사진 대체 텍스트 입력');
    //     }
    //     )
    // };
    const showContent = () => {
       
        const editorIns = editorRef.current.getInstance();
        //<p>안녕하세요</p>형태로 가져와짐
        const contentHtml = editorIns.getHTML();
     
        console.log(contentHtml);
        console.log(abc);
        // console.log(contentMark);
        //안녕하세요 가져와짐
        // const contentMark = editorIns.getMarkdown();
    }
    // useEffect(() => {
    //     const editorIns = editorRef.current.getInstance();
    //     editorIns.removeHook("addImageBlobHook"); //<- 훅 제거 
    //     editorIns.addHook('addImageBlobHook', addImage); //<- 훅 추가 
    //     // editorIns.addHook('addImageBlobHook', addImage1); //<- 훅 추가
    //     console.log(editorRef.setHTML);
        
    // }, []);
    // const addImage =  (blob, dropImage) => {
    //     const contentHtml = editorRef.current.getInstance().getHTML();
    //     let vari = contentHtml
    //     console.log(vari)
    //     const formData = new FormData(); //폼데이터 형식으로 선언
    //     formData.append('files', blob); //blob안에 들어있는데이터를 formData안에 넣어주는거
    //     dropImage(`http://localhost:8080/api/insertmusic/${blob.name}`)
    //     // const editorIns = editorRef.current.getInstance();
    //     // const contentHtml = editorIns.getHTML();
    //     setAbc(contentHtml)
    //     Editor.getHTML(vari);
    //     // editorRef.current.getInstance().setHTML() = vari;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob) 
        
    //     //현재 보여주는 화면에는 저걸 뿌리고 
    //     reader.onload = () => {
    //        dropImage(reader.result);
    //     }  
    // };

    const submit = (e) => {
        e.preventDefault();
        // let files = e.target.profile_files.files;
        let files = editorRef.current.getInstance().getHTML();
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
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
            <Editor
                ref={editorRef}
                // 미리보기 스타일 지정
                previewStyle="vertical"
                // 에디터 창 높이
                height="300px"
                //초기 입력모드 설정
                initialEditType="wysiwyg"
                //입력모드 변경 안보이게
                hideModeSwitch={true}
                //단축키 사용 여부
                useCommandShortcut={true}
                //글자색 변경 플러그인
                plugins={[colorSyntax]}
            />
            <button onClick={showContent}>작성</button>
            <button onClick={submit}>디비에 넣기</button>
            {/* <button onCLick={abc}>바꾸기</button> */}
        </>
    )
};

export default ToastEditor;
