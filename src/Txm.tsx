import * as React from 'react';
import { useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';
import {
  Box,
  Center,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const TMX_ABI = [
  {
    "inputs": [],
    "name": "ERC1820_REGISTRY",
    "outputs": [
      {
        "internalType": "contract IERC1820Registry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MULTICALL3",
    "outputs": [
      {
        "internalType": "contract IMulticall3",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct IMulticall3.Call3[]",
        "name": "_txs",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes",
        "name": "_metadata",
        "type": "bytes"
      }
    ],
    "name": "txmExecute",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct IMulticall3.Result[]",
        "name": "ret",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct IMulticall3.Call3Value[]",
        "name": "_txs",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes",
        "name": "_metadata",
        "type": "bytes"
      }
    ],
    "name": "txmExecuteWithValue",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct IMulticall3.Result[]",
        "name": "ret",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
];

function Txm() {
  // contract config
  const { config } = usePrepareContractWrite({
    address: '0x3BbF7719e739f6123Cc1Fcb831Ba78fbFFfA32e8',
    abi: TMX_ABI,
    functionName: 'txmExecute',
    // args
    // enabled
  })

  const [txs, setTxs] = useState([]);
  const [target, setTarget] = useState('');
  const [calldata, setCalldata] = useState('');

  // const { data, write } = useContractWrite(config)

  /**
   * handler
   */
  const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value)
    event.preventDefault()
  }

  const handleCalldataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalldata(event.target.value)
    event.preventDefault()
  }

  return (
    <>
      <Box w={'100vw'} h={'100vh'}>
        <Flex
          h={'100vh'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Center
            py={6}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
          >
            {/* left box */}
            <Box
              maxW={'270px'}
              w={'full'}
            >
              {/* transaction field */}
              {/* transaction submit */}
              <Box p={'6'} w={'270px'} borderRight={'1px'}>
                <Stack spacing={0} align={'center'} mb={5}>
                  {/* Call3.target */}
                  <FormControl p={'1'}>
                    <FormLabel htmlFor="target">target(address)</FormLabel>
                    <Input
                      id="target"
                      placeholder="target(address)"
                      onChange={handleTargetChange}
                    />
                  </FormControl>
                  {/* Call3.callData */}
                  <FormControl p={'1'}>
                    <FormLabel htmlFor="callData">callData(bytes)</FormLabel>
                    <Input
                      id="callData"
                      placeholder="callData(bytes)"
                      onChange={handleCalldataChange}
                    />
                  </FormControl>
                  {/* button */}
                  <FormControl p={'1'}>
                    <Button w={'full'}>
                      Add
                    </Button>
                  </FormControl>
                </Stack>
              </Box>
            </Box>
            {/* right box */}
            <Box
              maxW={'270px'}
              w={'full'}
            >
              <Box p={'6'} w={'270px'}>
                <Stack spacing={0} align={'center'} mb={5}>
                  {/* Metadata */}
                  <FormControl p={'1'}>
                    <FormLabel htmlFor="metadata">metadata(bytes)</FormLabel>
                    <Input id="metadata" placeholder="metadata(bytes)" />
                  </FormControl>
                  {/* broadcast button */}
                  <FormControl p={'1'}>
                    <Button w={'full'}>Trigger</Button>
                  </FormControl>
                </Stack>
              </Box>
            </Box>
          </Center>
        </Flex>
      </Box>
    </>
  )
}

export default Txm;
