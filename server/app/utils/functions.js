//imported libs..


const utils = {

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
            return `Os campos (${missingFields.join(', ')}) são obrigatórios.`
        }
    
        return true;
    }

}

export {utils}