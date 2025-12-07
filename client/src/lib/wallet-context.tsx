import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { UserRole } from "@shared/schema";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  role: UserRole;
  isConnecting: boolean;
  networkId: number | null;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  setRole: (role: UserRole) => void;
  truncatedAddress: string;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    role: "student",
    isConnecting: false,
    networkId: null,
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem("blokademi_wallet");
    const savedRole = localStorage.getItem("blokademi_role") as UserRole | null;
    if (savedAddress) {
      setState(prev => ({
        ...prev,
        isConnected: true,
        address: savedAddress,
        role: savedRole || "student",
      }));
    }
  }, []);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }));
    
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await (window as any).ethereum.request({
          method: "eth_chainId",
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          localStorage.setItem("blokademi_wallet", address);
          setState(prev => ({
            ...prev,
            isConnected: true,
            address,
            networkId: parseInt(networkId, 16),
            isConnecting: false,
          }));
        }
      } else {
        const mockAddress = "0x" + Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join("");
        localStorage.setItem("blokademi_wallet", mockAddress);
        setState(prev => ({
          ...prev,
          isConnected: true,
          address: mockAddress,
          networkId: 1,
          isConnecting: false,
        }));
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setState(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnect = useCallback(() => {
    localStorage.removeItem("blokademi_wallet");
    localStorage.removeItem("blokademi_role");
    setState({
      isConnected: false,
      address: null,
      role: "student",
      isConnecting: false,
      networkId: null,
    });
  }, []);

  const setRole = useCallback((role: UserRole) => {
    localStorage.setItem("blokademi_role", role);
    setState(prev => ({ ...prev, role }));
  }, []);

  const truncatedAddress = state.address
    ? `${state.address.slice(0, 6)}...${state.address.slice(-4)}`
    : "";

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        setRole,
        truncatedAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
