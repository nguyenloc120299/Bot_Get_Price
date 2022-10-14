import Web3 from 'web3';
import price_getter_abi from '../abi/price_getter_abi.json';
const RPC_URL: any = process.env.RPC_URL;
const BSCProvider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(BSCProvider);

const getContract = async (abi: any, address: any) => {
  return new web3.eth.Contract(abi, address);
};

const getPriceCork = async () => {
  try {
    const contract = await getContract(
      price_getter_abi,
      '0xC8485D39FD1f5419c0029960112D04cfE0Ca8722'
    );
    const result = await contract.methods
      .getPrice('0xe7EAdA32CAF827d3bA8Cb1074830d803C9bD48c3', 18)
      .call();
    const priceCork = Web3.utils.fromWei(result, 'ether');    
    return priceCork;
  } catch (error: any) {
    console.log(error.message);
  }
};
export {getPriceCork}
