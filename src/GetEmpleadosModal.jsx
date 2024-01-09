import React, { useState } from 'react';
import Camera from 'react-camera';
import Dropzone from 'react-dropzone';

const CameraComponent = () => {
  const [cameraType, setCameraType] = useState('front');
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    // Aquí puedes manejar la imagen capturada desde la cámara
    setCapturedImage(imageSrc);
  };

  const handleDrop = (acceptedFiles) => {
    // Aquí puedes manejar la imagen seleccionada desde el carrete
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  return (
    <div>
      <h1>Manipulación de la Cámara</h1>
      <Camera
        front
        capture
        isImageMirror={false}
        imageType={cameraType}
        onTakePhoto={handleCapture}
      />
      <div>
        <button onClick={() => setCameraType('front')}>Abrir cámara frontal</button>
        <button onClick={() => setCameraType('back')}>Abrir cámara trasera</button>
      </div>

      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Arrastra y suelta aquí para cargar desde el carrete</p>
          </div>
        )}
      </Dropzone>

      {capturedImage && (
        <div>
          <h2>Imagen Capturada</h2>
          <img src={capturedImage} alt="Captured" style={imageStyle} />
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
  marginTop: '20px',
};

export default CameraComponent;
