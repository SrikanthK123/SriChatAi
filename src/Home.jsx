import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Layout } from 'antd';
import Miangif from "../src/Images/MainLogo.gif";
const { Header } = Layout;
import { ApiKey } from './Secure';
import WarningGif from './Images/AlertGif.gif'

const Home = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerHeight, setAnswerHeight] = useState('auto');
    const [isLoading, setIsLoading] = useState(false);
    const [copyText, setCopyText] = useState("Copy");
    const [showAlert, setShowAlert] = useState(false);
  
    const generateAnswer = async () => {
      if (question.trim() === '') {
        setShowAlert(true);
        return;
      }
      
      setIsLoading(true);
      setShowAlert(false);
    
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${ApiKey}`,
          method: 'post',
          data: {
            contents: [{ parts: [{ text: question }] }]
          }
        });
    
        setAnswer(response.data.candidates[0].content.parts[0].text);
        setShowAnswer(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state, e.g., show error message to the user
      } finally {
        setIsLoading(false);
      }
    
      setQuestion("");
    };
    
  
    useEffect(() => {
      if (showAnswer) {
        const preElement = document.getElementById('answerPre');
        if (preElement) {
          setAnswerHeight(`${preElement.scrollHeight}px`);
        }
      }
    }, [answer, showAnswer]);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(answer);
      setCopyText("Copied");
  
      setTimeout(() => {
        setCopyText("Copy");
      }, 1500); // Adjust delay time as needed (1500ms = 1.5 seconds)
    };
  
  return (
    <div>
       <div className='p-5' style={{ backgroundColor: '#001529' }}>
      <Alert
      message="Notice"
      description="The most recent update to this AI was made in May 2023."
      type="info"
      showIcon
      closable
    />
      <div className="p-2 text-center">
        <img className="d-block mx-auto mb-2" src={Miangif} alt="" width="80" height="80" />
        <h1 className="display-5 fw-bold text-white">Sri Chat-AI</h1>
        <div className="col-lg-6 mx-auto">
          <p className="mb-4 text-white ParaMain">Sri Chat-AI: Your personalized AI assistant, offering accurate answers and insightful conversations at your fingertips. Experience the future of interaction with our cutting-edge technology.</p>
        </div>
      </div>

      <div className='' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div className='container'>
          <h2 className='text-white text-center m-4' style={{fontFamily:'sans-serif'}}>Chat Here</h2>


          <div className='form-floating'>
            <textarea
              className='form-control'
              placeholder='Leave a comment here'
              id='floatingTextarea2'
              style={{ height: '100px',fontFamily:'monospace' }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <label htmlFor='floatingTextarea2'>Type like a pro</label>
          </div>

          {showAlert && (
            <div className='p-3'>
          
            <h6 className='text WarningMsg' style={{color:'#c51350'}}> <img src= {WarningGif} className='p-1' style={{width:'30px',height:'30px'}} />Please enter a question before generating an answer.</h6>
            </div>
          )}
          <div className='button-wrapper'>
            <button onClick={generateAnswer} className='m-4 GeneratedBtn'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cpu mx-2" viewBox="0 0 16 16">
                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
              </svg>
              <span>Generate</span>
            </button>
          </div>

          {isLoading && (
            <div className='loader'></div>
          )}

          {showAnswer && !isLoading && (
            <div>
              <Header style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 0' }}>
               
                <div class="centralize">
  <div>
    <button onClick={copyToClipboard} className='CopyBtn'>
      <span>
       
        {copyText} 
      </span>
      <span>Copied</span>
    </button>
  </div>
</div>

               
              </Header>
              <div className='container' style={{ height: answerHeight, width: '100%', backgroundColor: '#352f44', overflow: 'auto', borderRadius:'10px' }}>
              <pre
  id='answerPre'
  className='text-white p-3'
  style={{
    fontFamily: 'sans-serif',
    textAlign: 'justify',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'hidden',
    marginBottom: '0',
    minHeight: '20vh',
    lineHeight: '1.6' ,
   
  }}
>
  {answer}
</pre>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home;
