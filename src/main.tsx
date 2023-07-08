import React from 'react'
import ReactDOM from 'react-dom/client'
// wagmi
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from '@wagmi/core/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// chakra-ui
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
)
