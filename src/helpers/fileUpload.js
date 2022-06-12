
export const fileUpload = async (file) => {

    const baseImagesCloudinary='React-Journal'
    const cloudinaryName='dyyfc2gux';
    const cloudURL=`https://api.cloudinary.com/v1_1/${cloudinaryName}/upload`;
    const formData=new FormData();
    formData.append('upload_preset', baseImagesCloudinary);
    formData.append('file', file);
    
    try {
        const res= await fetch(cloudURL, {
            method:'POST',
            body:formData
        })
        if (res.ok){
            try {
                const cloudRes=await res.json();
                return cloudRes.secure_url;
            } catch (error) {
                return null
            }

        }else{
            return null;
            //throw await res.json();
        }
    } catch (error) {
        return null;
    }
    
}
