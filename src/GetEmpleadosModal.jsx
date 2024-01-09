import { Camera } from 'react-native';

const App = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const openCamera = () => {
    cameraOpen ? setCameraOpen(false) : setCameraOpen(true);
  };

  const openCameraWithPreview = () => {
    cameraOpen ? setCameraOpen(false) : setCameraOpen(true);
    camera.open({
      showPreview: true,
    });
  };

  const openPhotos = () => {
    setPhotos(Camera.getPhotos());
  };

  return (
    <div>
      <button onClick={openCamera}>Abrir cámara sin carrete</button>
      <button onClick={openCameraWithPreview}>Abrir cámara con carrete</button>
      <button onClick={openPhotos}>Abrir fotos</button>
      {cameraOpen && (
        <Camera
          ref={camera}
          onTakePicture={(data) => {
            setPhotos([...photos, { data }]);
          }}
        />
      )}
      {photos.length > 0 && (
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <img src={photo.uri} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
