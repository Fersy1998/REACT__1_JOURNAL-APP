
//Repara el error de jest setInmediate

//import setImmediate from 'timers';
//import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";
import '@testing-library/jest-dom';
/* Al hacer uso de cloudinary no puedo resolver problema de borrrar imagen
cloudinary.config({ 
    cloud_name: 'dyyfc2gux', 
    api_key: '947144642875543', 
    api_secret: 'kkpxu7FZ2vjbwdF0Tn-DD9-hrgc',
    secure: true
  });*/
  jest.setTimeout(9000);
describe('pruebas en fileUpload.js', ()=>{
    test('should upload the file and return the URL', async() => {
        const res= await fetch('https://pbs.twimg.com/media/FHjD_x_X0AIis7C.png');
        const blob= await res.blob();
        const file= new File([blob],'foto.jpg');
        const url=await fileUpload(file);
        expect(typeof url).toBe('string');
        
        //Borrar imagen por Id
       /* const segments=url.split('/');
        const imageId=segments[segments.length-1].replace('.png', '');
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            console.log('Ok');
        });*/
    })
    test('should return error', async() => {
        
        const file= new File([],'foto.jpg');
        const url=await fileUpload(file);
        expect(url).toBe(null);
    })
    
})