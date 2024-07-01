//imported libs..


const utils = {

    //função que valida campos obrigatorios.. ELE FUNCIONA COM VALORES RESPECTIVAMENTE.
    validate(data, requiredFields) {
        const missingFields = [];

        //veifica se existe campo..
        requiredFields.forEach(field => {

            if (!data.hasOwnProperty(field)) {

                missingFields.push(field);

            }

        });

        //verifica se campo esta vazio..
        Object.values(data).forEach((element, index) => {
            
            if (element.length <= 0) {

                missingFields.push(requiredFields[index]);

            }

        });

        if (missingFields.length > 0) {
            return missingFields;
        }
    
        return true;
    }

}

export {utils}