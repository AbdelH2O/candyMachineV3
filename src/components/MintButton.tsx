import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useCandyMachine } from "../hooks/useCandyMachine";
import { useMetaplex } from "../hooks/useMetaplex";
import { allowed } from "../enums/allowedList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Spinner from "./Spinner";
// import MerkleTree from 'merkletreejs';
// import { keccak_256 } from '@noble/hashes/sha3';

const MintButton = ({ loaded }: { loaded: boolean }) => {
    const wallet = useWallet();
    if(!wallet.connected) {
        return (
            <WalletMultiButton />
        );
    }
    const { metaplex } = useMetaplex();
    const { candyMachine, collection, setCandyMachine } = useCandyMachine();
    const [isMinting, setIsMinting] = useState(false);
    // const proof = getMerkleTree(allowed);
    const mint = async () => {
        setIsMinting(true);
        try {
            console.log(candyMachine);
            
            if (!candyMachine) {
                throw new Error('Candy machine not found');
            }
            console.log(allowed);
            const auth = await metaplex?.candyMachines().callGuardRoute({
                candyMachine: candyMachine,
                guard: "allowList",
                settings: {
                    path: "proof",
                    merkleProof: [],
                }
            });
            if(auth?.response.confirmResponse.value.err) {
                toast(auth?.response.confirmResponse.value.err.toString(), {
                    type: 'error',
                });
            }
            const resp = await metaplex?.candyMachines().mint({
                candyMachine: candyMachine,
                collectionUpdateAuthority: candyMachine.authorityAddress,
            });
            if(resp?.response.confirmResponse.value.err) {
                toast(resp?.response.confirmResponse.value.err.toString(), {
                    type: 'error',
                });
                // throw new Error(resp?.response.confirmResponse.value.err.toString());
            }
            setCandyMachine(await metaplex?.candyMachines().refresh(candyMachine));
            toast('Minted successfully!', {
                type: 'success',
            });
        } catch (error) {
            console.log(error);
            
            console.log(Object.keys(error).map((key) => error[key]));
            if(error.cause && error.cause.name === "AddressNotFoundInAllowedList") {
                toast("You are not whitelisted!", {
                    type: 'error',
                });
            }
            // toast(error.toString(), {
            //     type: 'error',
            // });
        }
        setIsMinting(false);
    };

    return (
        <div className="flex flex-col p-6 justify-around">
            <WalletMultiButton />
            <button
                disabled={!loaded}
                onClick={mint}
                className={loaded ? "border border-[#646cff5e] active:border-none mt-4 flex flex-row items-center justify-center" : "cursor-not-allowed hover:border-none mt-4 flex flex-row items-center justify-center"}
            >
                {
                    isMinting ? <Spinner /> : "Mint"
                }
            </button>
            <ToastContainer />
        </div>
    );
}

export default MintButton;