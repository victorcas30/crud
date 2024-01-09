import React, { useState } from 'react';
import Camera from 'react-camera';
import Dropzone from 'react-dropzone';

const CameraWithDropzone = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (imageSrc) => {
    // Maneja la imagen capturada aquí
    setCapturedImage(imageSrc);
  };

  const handleDrop = (acceptedFiles) => {
    // Maneja la imagen seleccionada desde el carrete aquí
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  return (
    <div>
      <h1>Abrir la cámara con carrete</h1>
      <Camera front capture isImageMirror={false} onTakePhoto={handleCapture} />
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Arrastra y suelta aquí para cargar desde el carrete</p>
          </div>
        )}
      </Dropzone>

      {capturedImage && (
        <div>
          <h2>Imagen Capturada</h2>
          <img src={capturedImage} alt="Capturada" style={imageStyle} />
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

export default CameraWithDropzone;
