import e from "cors";
import { sceneEvents } from "../Events/EventsCenter";

export async function getPlayerNFT(moralis) {
    return;
    if (!moralis) return;

    const playerAddress1 = '0xeac41D05531770b85ad1E0f145b94BFE205bDa78';
    const playerAddress2 = '0xffE06cb4807917bd79382981f23d16A70C102c3B';
    const duckAddress = '0xA92e08909a0C3FB1cE52F84bDA8Db98439C857eD'
    const moonbirdGuy = "0x6A53198fb773Aa86447579020e6C2B55B35DC314";
    // get current moralis user
    var userAddress = await moralis.User.current().get('ethAddress');
    // to lower case

    var result;

    if (userAddress.toLowerCase() == "0x0e4cbe4506e0894ed0074e441f8ab0a42e2fe7e0") {
        result = await moralis.Web3.getNFTs({ chain: 'eth', address: "0x59E1faC2FAF72765AD41aE1BfAC53d5cd80acB91" });
    } else {
        result = await moralis.Web3API.account.getNFTs();
        if (result) result = result.result;
    }
    
    // get eth account
    // get only supported NFTs
    result = sortNFTs(result);


    var pageResults = [];

    var currentPage;

    getNFTsFromPage(1);

    function getNFTsFromPage(page)  {
        return;
        currentPage = page;

        if (page <= pageResults.length) {
            sceneEvents.emit('getNFTsFromPageResult', pageResults[page - 1]);
            return;
        }

        let count = 0;

        const promises = result.map(async (r) => {
            // if ((page - 1) * 12 <= count && count < page * 12) {
            //     count++;
                if (r.token_uri) {
                    let url = fixURL(r.token_uri);
                    try {
                        // if url is data:application/json; fetch right away
                        // if not, proxy via /metadata?uri=
                        let data
                        if (url.startsWith("data:application/json")) {
                            data = await fetch(url).then(r => r.json());
                        } else if (false) {
                            data = await moralis.Web3.getMetadata({ chain: 'eth', uri: url });
                        } else {
                            const proxiedURL = `/metadata?uri=${encodeURIComponent(url)}`;
                            data = await fetch(proxiedURL).then(r => { return r.json() });
                        }
                        if (data && data.image) {
                            console.log(data);
                            return { image: fixImageURL(data.image), name: data.name, tokenId: r.token_id };
                        }
    
                    } catch (err) {
                        console.log('Error with', r.token_uri, err);
                    }
                }
            } 
            // else {
            //     count++;
            //     return null;
            // }
        //}
        )
        Promise.all(promises).then(r => {
            r = r.filter(data => data != null);
            if (currentPage > pageResults.length) {
                pageResults.push(r);
            }
            sceneEvents.emit('getNFTsFromPageResult', r);
        });
    };
}


function fixURL(url) {
    if (url.startsWith("ipfs")) {
        return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/").slice(-1)[0];
    }
    else {
        return url;
    }
}
function fixImageURL(url) {
    if (url.startsWith("ipfs")) {
        return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)[0];
    } else {
        return url;
    }
}


// SUPPORTED NFTs 
const supportedNFTs = [
    "Moonbirds At Home",
    "CryptoDuckies"
]


// get only supproted NFTs
function sortNFTs(result) {
    return;
    const nfts = result.filter(r => supportedNFTs.includes(r.name));
    return nfts;
}