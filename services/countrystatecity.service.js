const { Country, State, City } = require('country-state-city');

module.exports.getAllCountries = () => {
    return Country.getAllCountries();
}

module.exports.getStatesByCountry = (countryCode = 'IN') => {
    return State.getStatesOfCountry(countryCode);
}

module.exports.getCitiesByCodes = (countryCode, stateCode) => {
    return City.getCitiesOfState(countryCode, stateCode);
}

module.exports.getCountryNameByCode = (countryCode) => {
    let name = 'NA';
    Country.getAllCountries().forEach((d) => {
        if (d.isoCode == countryCode) {
            name = d.name;
        }
    });
    return name;
}

module.exports.getStateNameByCode = (countryCode, stateCode) => {
    let name = 'NA';
    State.getStatesOfCountry(countryCode).forEach((d) => {
        if (d.isoCode == stateCode) {
            name = d.name;
        }
    });
    return name;
}