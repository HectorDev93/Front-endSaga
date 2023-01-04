const Tool ={
    baseURL: "http://10.32.50.8:8000/api/",
    validTxt: new RegExp(
        '^[a-zA-Z]+$'),
    validTxtSpa: new RegExp(
            '^[a-zA-Záéíóú ]+$')  
}

export default Tool;