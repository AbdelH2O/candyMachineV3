import MintButton from "../components/MintButton";
import React from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useCandyMachine } from "../hooks/useCandyMachine";
import Spinner from "../components/Spinner";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";

const Home = () => {
    const { candyMachine, collection, collectionMeta } = useCandyMachine();
    // const [im] = React.useState(new Image());

    if(!candyMachine) {
        return (
            <div className="App">
                <MintButton />
            </div>
        );
    }

    // if(!imReady){
    //     im.onload = () => {
    //         setImReady(true);
    //     }
    //     im.src = collectionMeta ? collectionMeta.image : '';
    // }
    console.log(candyMachine);
    
    return (
        <div className="text-center flex flex-col justify-center items-center mt-12 w-1/2 h-3/4 bg-gray-900 border border-solid border-[#646cff5e]/30 p-10 rounded-xl shadow-2xl">
            {
                collectionMeta.image ? (
                    <div className="flex flex-col">
                        {/* <img src={im.src} className="w-72 rounded-md mb-4"/> */}
                        <Image src={collectionMeta.image} width={300} height={300} className="w-72 rounded-md mb-4"/>
                        <p className="mb-4 text-xl font-bold mb-2">{collectionMeta.name}</p>
                        <p className="mb-2">
                            {
                                candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints.toString() ? 
                                candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints.toNumber()/LAMPORTS_PER_SOL:
                                "Price: 0"
                            } ◎
                        </p>
                        <p>{candyMachine.itemsRemaining.toString()}/{candyMachine.itemsAvailable.toString()}</p>
                    </div>
                ) : 
                <div className="w-72 h-72 flex justify-center items-center">
                    <Spinner />
                </div>
            }
            <div>
                <MintButton loaded={!!collectionMeta.image}/>
            </div>
        </div>
    );
};

export default Home;