import { ethers } from 'ethers';
import * as greeter from './greeter';
class SDK {
    constructor(provider) {
        this.instance = Object.assign({ _provider: provider, _ethers: ethers }, greeter);
    }
}
export default SDK;
//# sourceMappingURL=index.js.map