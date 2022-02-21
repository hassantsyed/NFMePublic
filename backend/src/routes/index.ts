import { Router } from 'express';
import { getNftMetadata, getNftTxs, listCreators, listAllTxs, getRandomNftTxs, liftNftMetadata } from "./Metadata";

const nftRouter = Router();
nftRouter.post("/metadata", getNftMetadata);
nftRouter.get("/tx/:address", getNftTxs);
nftRouter.get("/tx/list/creators", listCreators);
nftRouter.get("/tx/list/nfts", listAllTxs);
nftRouter.get("/tx/random/:amount", getRandomNftTxs);
nftRouter.get('/metadata/list', liftNftMetadata);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/nft', nftRouter);
export default baseRouter;
