import { useRef, useState } from 'react';
import { Canvas } from './components/Canvas/Canvas';
import './App.css';

function App() {
  const [drawCanvas,setDrawCanvas] = useState();
  const [data,setData] = useState({x:0,y:0,rgba:'255,255,255,1'})
  const [selected,setSelected] = useState({x:0,y:0,rgba:'255,255,255,1'});
  const ref = useRef();
  const loadFile = (event) => {
    const target = event.target;

    if (!FileReader) {
        alert('FileReader не поддерживается — облом');
        return;
    }

    if (!target.files.length) {
        alert('Ничего не загружено');
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function() {
      const image = new Image();
      image.src = fileReader.result; 
      image.onload = function(){
        setDrawCanvas({src:fileReader.result, width:this.width, height:this.height});
}  
    }
    fileReader.readAsDataURL(target.files[0]);
  }
    const loadByUrl = (url) => {
        var image = new Image();
        image.crossOrigin = `Anonymous`;
        image.src = url; 
        image.onload = function(){
          setDrawCanvas({src:image.src, width:this.width, height:this.height});
          }  
      }

  return (
    <div className="App">
      <div className='main'>
      <div className='aside'>
      {drawCanvas && <Canvas src={drawCanvas.src} width={drawCanvas.width} height={drawCanvas.height} setData={setData} setSelected={setSelected}/>}
      <div>
      <label class="input-file">
	   	<input type="file" name="file" onChange={loadFile}/>
 	   	<span class="input-file-btn">Выберите файл</span>           
	   	<span class="input-file-text">Максимум 10мб</span>
 	    </label>
        <p>Или укажите ссылку</p>
        <input type='text' ref={ref} className='input'/>
        <button onClick={() => loadByUrl(ref.current.value)} className='btn'>Загрузить</button>
      </div>
      </div>
      { drawCanvas && 
        <div className='infContainer'>
          <div className='info'>
            <h2>Hovered:</h2>
            <p>Size:{drawCanvas.width}x{drawCanvas.height}</p>
            <p>X:{data.x}</p>
            <p>Y:{data.y}</p>
            <div className='colorBox' style={{backgroundColor: data.rgba, color:data.rgba}}>
              <p>{data.rgba}</p>
            </div>
          </div>

          <div className='info'>
            <h2>Selected:</h2>
            <p>Size:{drawCanvas.width}x{drawCanvas.height}</p>
            <p>X:{selected.x}</p>
            <p>Y:{selected.y}</p>
            <div className='colorBox' style={{backgroundColor: selected.rgba, color:selected.rgba}}>
              <p>{selected.rgba}</p>
            </div>
          </div> 
        </div>}
      </div>
    </div>
  );
}

export default App;
