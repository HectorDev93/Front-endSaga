 const Tool ={
    //baseURL: "http://10.32.80.5:8000/api/",
    baseURL: "http://10.32.100.48:8000/api/",
    validTxt: new RegExp(
        '^[a-zA-Z]+$'),
    validTxtSpa: new RegExp(
            '^[a-zA-Záéíóú ]+$') ,
    validTxt3: "^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(?:\s[a-záéíóúñ]+)*$" ,
    validTxt5: "^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{3,15}( [a-záéíóúñ]{2,25}){0,3}$",
    validTxt4: "^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,24}( [a-záéíóúñ]{2,25}){0,3}$",
    validTxt6: "^([a-záéíóúñA-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ]{1,24})( ([a-záéíóúñA-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ]{0,24}\.?)){0,3}$",
    validNum1: "[0-9]{5,8}",    
    txtValidPront: "Utilice solo letras y espacios, minimo 1 caracter, maximo 35 caracteres. Ej: Héctor A. o Héctor Arnaldo "
} 

export default Tool;