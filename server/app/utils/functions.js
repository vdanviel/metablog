//imported libs..


const utils = {

    validate(data, requiredFields) {
        const missingFields = [];
    
        requiredFields.forEach(field => {

            if (!data.hasOwnProperty(field)) {

                missingFields.push(field);

            }

        });

        if (missingFields.length > 0) {
            return `Os campos (${missingFields.join(', ')}) são obrigatórios.`
        }
    
        return true;
    }

}

export {utils}