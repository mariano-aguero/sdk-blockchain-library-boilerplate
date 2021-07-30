require('dotenv').config();
import { ethers } from 'ethers';
import Greeter from './modules/greeter';
class SDK {
    constructor(provider, modules, signer) {
        this.instance = {
            _provider: provider,
            _ethers: ethers,
            _signer: signer,
            modules,
        };
    }
    static async create(provider, signer) {
        const greeter = await Greeter.create(provider, signer);
        return new SDK(provider, { greeter }, signer);
    }
}
export default SDK;
//# sourceMappingURL=index.js.map