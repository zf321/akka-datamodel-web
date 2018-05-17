import { ODataConfiguration } from "odata-lib";

export class ODataConfigurationFactory {

    constructor () {
        const config = new ODataConfiguration();
        config.baseUrl = 'http://localhost:5000/api';
        return config;
    }
}
