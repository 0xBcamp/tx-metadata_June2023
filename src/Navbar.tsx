import {
  Button,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'

function Navbar() {
  // chakra
  const { colorMode, toggleColorMode } = useColorMode();
  // wagmi
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={'4'}>
        <Flex h={'16'} minWidth='max-content' alignItems={'center'} gap={'2'}>
          <Box p='2'>
            <Heading size='md'>Tx Metadata</Heading>
          </Box>

          <Spacer />

          <Flex alignItems={'center'}>
            <Stack direction={'row'}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                {
                  isConnected
                    ?
                      <Menu>
                        <MenuButton>
                          {
                            ensName ? ensName : address
                          }
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={disconnect}>
                            Disconnect
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    : connectors.map((connector) => (
                        <Button
                          disabled={!connector.ready}
                          key={connector.id}
                          onClick={() => connect({ connector })}
                        >
                          {connector.name}
                        </Button>
                      ))
                }
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
