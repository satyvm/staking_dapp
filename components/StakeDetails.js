import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { stakingAbi, stakingAddress, rewardTokenAbi, rewardTokenAddress } from "../constants";
import { ethers } from "ethers";

export default function StakeDetails() {
    const { account, isWeb3Enabled } = useMoralis();
    const [rtBalance, setRtBalance] = useState("0");
    const [stakedBalance, setStakedBalance] = useState("0");
    const [earnedBalance, setEarnedBalance] = useState("0");

    const {runContractFunction: getRtBalance} = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account
        },
    })

    const {runContractFunction: getStakedBalance} = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "getStaked",
        params: {
            account: account
        },
    })

    const {runContractFunction: getEarnedBalance} = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "earned",
        params: {
            account: account
        },
    })

    useEffect(() => {
        if(isWeb3Enabled && account){
            updatedUiValues();
        }
    }, [isWeb3Enabled, account])

    async function updatedUiValues() {
        const rtBalanceFromContract = (await getRtBalance({onError: (error) => console.log(error)})).toString()
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract,
            "ether"
        )
        setRtBalance(formattedRtBalanceFromContract)

        const stakedBalanceFromContract = (await getStakedBalance({onError: (error) => console.log(error)})).toString()
        const formattedStakedBalanceFromContract = ethers.utils.formatUnits(
            stakedBalanceFromContract,
            "ether"
        )
        setStakedBalance(formattedStakedBalanceFromContract)

        const earnedBalanceFromContract = (await getEarnedBalance({onError: (error) => console.log(error)})).toString()
        const formattedEarnedBalanceFromContract = ethers.utils.formatUnits(
            earnedBalanceFromContract,
            "ether"
        )
        setEarnedBalance(formattedEarnedBalanceFromContract)
    }


    return (
        <div>
            <div> RT Balance is: {rtBalance} </div>
            <div> Staked Balance is: {stakedBalance} </div>
            <div> Earned Balance is: {earnedBalance} </div>
        </div>
    )
}