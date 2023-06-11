import ENS, { getEnsAddress } from '@ensdomains/ensjs'
export async function getEnsDomain(moralis) {
    return;
    const account = await moralis.User.current();
    const ens = new ENS({ provider: window.ethereum, ensAddress: getEnsAddress('1') });
    let name = await ens.getName(account.get('ethAddress'));
    return name.name;
}