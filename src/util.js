const Tool ={
    //baseURL: "http://10.32.80.5:8000/api/",
    baseURL: "http://10.32.100.48:8000/api/",
    validTxt: new RegExp(
        '^[a-zA-Z]+$'),
    validTxtSpa: new RegExp(
            '^[a-zA-Záéíóú ]+$')  
}

export default Tool;