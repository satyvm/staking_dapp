import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
    <nav className="p-5 border-b-2 flex flex-row">
          <h1 className="py-4 px-4 font-bold text-3x1">Staking Dapp</h1>
          <div className ="ml-auto py-2 px-6">
            <ConnectButton  moralisAuth={false} />
          </div>
    </nav>
    </div>
  );
}